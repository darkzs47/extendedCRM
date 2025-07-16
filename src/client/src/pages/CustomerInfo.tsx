import {type FC, memo, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {getCustomerById} from "../store/customer/actions.ts";
import type {ICustomerFullInfo} from "../models/ICustomerFullInfo.ts";
import styles from "../styles/customer.module.scss";

const CustomerInfo: FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const customerFromStore = useSelector((state: RootState) => state.customer.customer)
    const [customer, setCustomer] = useState<ICustomerFullInfo | null>(null)

    useEffect(() => {
        const getCustomerInfo = async () => {
            const result = await dispatch(getCustomerById(Number(id)))
            if (!result.success) {
                navigate('/customers')
            }
        }
        getCustomerInfo()
    }, [])

    useEffect(() => {
        setCustomer(customerFromStore)
    }, [customerFromStore])

    return (
        <main className={styles.customerMain}>
            <div className={styles.customerMainSection}>
                <h2>Информация об организации</h2>
                <p><span className={styles.customerMainLabel}>Организация:</span> {customer?.companyName}</p>
                <p><span className={styles.customerMainLabel}>Организационно-правовая форма:</span> {customer?.legalForm}</p>
                <p><span className={styles.customerMainLabel}>Email:</span> {customer?.email}</p>
                <p><span className={styles.customerMainLabel}>Номер телефона:</span> {customer?.phone}</p>
                <p><span className={styles.customerMainLabel}>ИНН:</span> {customer?.inn}</p>
                <p><span className={styles.customerMainLabel}>КПП:</span> {customer?.kpp}</p>
                <p><span className={styles.customerMainLabel}>ОГРН:</span> {customer?.ogrn}</p>
                {/*@ts-ignore*/}
                <p><span className={styles.customerMainLabel}>Размер персональной скидки:</span> {((1 - customer?.discount) * -100).toFixed(0)}%</p>
            </div>
            <div className={styles.customerMainSection}>
                <h2>Представители</h2>
                {customer?.representatives.map((rep) =>
                    <div key={rep.id} className={styles.customerMainGroup}>
                        <p><span className={styles.customerMainLabel}>Главный представитель клиента:</span> {rep.isMain ? 'Да' : 'Нет'}</p>
                        <p><span className={styles.customerMainLabel}>ФИО:</span> {rep.secondName} {rep.name} {rep.lastName}</p>
                        <p><span className={styles.customerMainLabel}>Email:</span> {rep.email}</p>
                        <p><span className={styles.customerMainLabel}>Телефон:</span> {rep.phone}</p>
                        <p><span className={styles.customerMainLabel}>Должность:</span> {rep.representativePosition}</p>
                    </div>
                )}
            </div>
            <div className={styles.customerMainSection}>
                <h2>Филиалы</h2>
                {customer?.branches.map((branch) => (
                    <div key={branch.id} className={styles.customerMainGroup}>
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

export default memo(CustomerInfo);