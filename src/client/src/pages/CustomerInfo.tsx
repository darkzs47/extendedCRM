import {type FC, memo, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {getById} from "../store/customer/actions.ts";
import type {ICustomerFullInfo} from "../models/ICustomerFullInfo.ts";

const CustomerInfo: FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const customerFromStore = useSelector((state: RootState) => state.customer.customer)
    const [customer, setCustomer] = useState<ICustomerFullInfo | null>(null)

    useEffect(() => {
        const getCustomerInfo = async () => {
            const result = await dispatch(getById(Number(id)))
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
        <main>
            <div>
                <h2>Информация об организации</h2>
                Организация: {customer?.companyName} <br/>
                Организационно-правовая форма: {customer?.legalForm} <br/>
                Email: {customer?.email} <br/>
                Номер телефона: {customer?.phone} <br/>
                ИНН: {customer?.inn} <br/>
                КПП: {customer?.kpp} <br/>
                ОГРН: {customer?.ogrn} <br/>
                {/*@ts-ignore*/}
                Размер персональной скидки: {((1 - customer?.discount) * -100).toFixed(0)}% <br/>
            </div>
            <div>
                Представители
                {customer?.representatives.map((representative) =>
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
                {customer?.branches.map((branch) =>
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

export default memo(CustomerInfo);