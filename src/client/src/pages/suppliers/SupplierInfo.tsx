import {type FC, memo, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import type {ISupplierFullInfo} from "../../models/ISupplierFullInfo.ts";
import {getSupplierById} from "../../store/supplier/actions.ts";
import styles from "./supplier.module.scss"

const SupplierInfo: FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const supplierFromStore = useSelector((state: RootState) => state.supplier.supplier)
    const [supplier, setSupplier] = useState<ISupplierFullInfo | null>(null)

    useEffect(() => {
        const getSupplierInfo = async () => {
            const result = await dispatch(getSupplierById(Number(id)))
            if (!result.success) {
                navigate('/customers')
            }
        }
        getSupplierInfo()
    }, [])

    useEffect(() => {
        setSupplier(supplierFromStore)
    }, [supplierFromStore])

    return (
        <main className={styles.customerMain}>
            <div className={styles.customerMainSection}>
                <h2>Информация об организации</h2>
                <p><span className={styles.customerMainLabel}>Организация:</span> {supplier?.companyName}</p>
                <p><span className={styles.customerMainLabel}>Организационно-правовая форма:</span> {supplier?.legalForm}</p>
                <p><span className={styles.customerMainLabel}>Email:</span> {supplier?.email}</p>
                <p><span className={styles.customerMainLabel}>Номер телефона:</span> {supplier?.phone}</p>
                <p><span className={styles.customerMainLabel}>ИНН:</span> {supplier?.inn}</p>
                <p><span className={styles.customerMainLabel}>КПП:</span> {supplier?.kpp}</p>
                <p><span className={styles.customerMainLabel}>ОГРН:</span> {supplier?.ogrn}</p>
            </div>
            <div className={styles.customerMainSection}>
                <h2>Представители</h2>
                {supplier?.representatives.map((rep) => (
                    <div key={rep.id} className={styles.customerMain__group}>
                        <p><span className={styles.customerMainLabel}>Главный представитель поставщика:</span> {rep.isMain ? 'Да' : 'Нет'}</p>
                        <p><span className={styles.customerMainLabel}>ФИО:</span> {rep.secondName} {rep.name} {rep.lastName}</p>
                        <p><span className={styles.customerMainLabel}>Email:</span> {rep.email}</p>
                        <p><span className={styles.customerMainLabel}>Телефон:</span> {rep.phone}</p>
                        <p><span className={styles.customerMainLabel}>Должность:</span> {rep.representativePosition}</p>
                    </div>
                ))}
            </div>
            <div className={styles.customerMainSection}>
                <h2>Филиалы</h2>
                {supplier?.branches.map((branch) => (
                    <div key={branch.id} className={styles.customerMain__group}>
                        <p><span className={styles.customerMainLabel}>Главный филиал:</span> {branch.isMain ? 'Да' : 'Нет'}</p>
                        <p><span className={styles.customerMainLabel}>Название:</span> {branch.name}</p>
                        <p><span className={styles.customerMainLabel}>Email:</span> {branch.email}</p>
                        <p><span className={styles.customerMainLabel}>Телефон:</span> {branch.phone}</p>

                        <div className={styles.customerMainSubsection}>
                            <p><strong>Представитель филиала</strong></p>
                            <p><span className={styles.customerMainLabel}>ФИО:</span> {branch.representative.secondName} {branch.representative.name} {branch.representative.lastName}</p>
                            <p><span className={styles.customerMainLabel}>Email:</span> {branch.representative.email}</p>
                            <p><span className={styles.customerMainLabel}>Телефон:</span> {branch.representative.phone}</p>
                            <p><span className={styles.customerMainLabel}>Должность:</span> {branch.representative.representativePosition}</p>
                        </div>

                        <div className={styles.customerMainSubsection}>
                            <p><strong>Фактический адрес</strong></p>
                            <div className={styles.customerMainAddress}>
                                <span>{branch.addressActual.country},</span>
                                <span>{branch.addressActual.region},</span>
                                <span>{branch.addressActual.city},</span>
                                <span>{branch.addressActual.street},</span>
                                <span>{branch.addressActual.house},</span>
                                <span>{branch.addressActual.building}</span>
                            </div>
                            <p><span className={styles.customerMainLabel}>Почтовый индекс:</span> {branch.addressActual.postCode}</p>
                        </div>

                        <div className={styles.customerMainSubsection}>
                            <p><strong>Юридический адрес</strong></p>
                            <div className={styles.customerMainAddress}>
                                <span>{branch.addressLegal.country},</span>
                                <span>{branch.addressLegal.region},</span>
                                <span>{branch.addressLegal.city},</span>
                                <span>{branch.addressLegal.street},</span>
                                <span>{branch.addressLegal.house},</span>
                                <span>{branch.addressLegal.building}</span>
                            </div>
                            <p><span className={styles.customerMainLabel}>Почтовый индекс:</span> {branch.addressLegal.postCode}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default memo(SupplierInfo);