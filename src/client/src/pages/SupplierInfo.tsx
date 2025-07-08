import {type FC, memo, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import type {ISupplierFullInfo} from "../models/ISupplierFullInfo.ts";
import {getSupplierById} from "../store/supplier/actions.ts";

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
        <main>
            <div>
                <h2>Информация об организации</h2>
                Организация: {supplier?.companyName} <br/>
                Организационно-правовая форма: {supplier?.legalForm} <br/>
                Email: {supplier?.email} <br/>
                Номер телефона: {supplier?.phone} <br/>
                ИНН: {supplier?.inn} <br/>
                КПП: {supplier?.kpp} <br/>
                ОГРН: {supplier?.ogrn} <br/>
            </div>
            <div>
                Представители
                {supplier?.representatives.map((representative) =>
                    <div key={representative.id}>
                        Главный представитель клиента: {representative.isMain ? 'Да' : 'Нет'} <br/>
                        ФИО: {representative.secondName} {representative.name} {representative.lastName} <br/>
                        Email: {representative.email} <br/>
                        Phone: {representative.phone} <br/>
                        Должность: {representative.position} <br/>
                    </div>
                )}
            </div>
            <div>
                Филиалы
                {supplier?.branches.map((branch) =>
                    <div key={branch.id}>
                        <div>
                            Главный филиал: {branch.isMain ? 'Да' : 'Нет'} <br/>
                            Название: {branch.name} <br/>
                            Email: {branch.email} <br/>
                            Phone: {branch.phone} <br/>
                        </div>
                        <div>
                            Представитель филиала
                            {
                                <div>
                                    ФИО: {branch.representative.secondName} {branch.representative.name} {branch.representative.lastName}
                                    <br/>
                                    Email: {branch.representative.email} <br/>
                                    Phone: {branch.representative.phone} <br/>
                                    Должность: {branch.representative.position} <br/>
                                </div>
                            }
                        </div>
                        <div>
                            Фактический адрес
                            {
                                <div>
                                    <span>{branch.addressActual.country}, </span>
                                    <span>{branch.addressActual.region}, </span>
                                    <span>{branch.addressActual.city}, </span>
                                    <span>{branch.addressActual.street}, </span>
                                    <span>{branch.addressActual.house}, </span>
                                    <span>{branch.addressActual.building}</span>
                                    <br/>
                                    Почтовый индекс: {branch.addressActual.postCode}
                                </div>
                            }
                        </div>
                        <div>
                            Юридический адрес
                            {
                                <div>
                                    <span>{branch.addressLegal.country}, </span>
                                    <span>{branch.addressLegal.region}, </span>
                                    <span>{branch.addressLegal.city}, </span>
                                    <span>{branch.addressLegal.street}, </span>
                                    <span>{branch.addressLegal.house}, </span>
                                    <span>{branch.addressLegal.building}</span>
                                    <br/>
                                    Почтовый индекс: {branch.addressLegal.postCode}
                                </div>
                            }
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default memo(SupplierInfo);