import {type FC, memo, useEffect, useState} from "react";
import type {ICustomer} from "../models/ICustomer.ts";
import CustomerRow from "../components/CustomerRow.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import AddIdentityButton from "../components/AddIdentityButton.tsx";
import { getAllCustomers } from "../store/customers/actions.ts";

const CustomersTable: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const customersFromStore = useSelector((state: RootState) => state.customers.customers)

    const [customers, setCustomers] = useState<ICustomer[] | null>(null);

    useEffect(() => {
        dispatch(getAllCustomers());
    }, [dispatch]);

    useEffect(() => {
        setCustomers(customersFromStore);
    }, [customersFromStore]);

    return (
        <>
            <AddIdentityButton identity={"customers"}/>
        <table>
            <thead>
            <tr>
                <th>Организация</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Персональная скидка</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            {customers?.map((customer) =>
                <tr key={customer.id}>
                    <CustomerRow
                        customer={customer}
                    />
                </tr>
            )}
            </tbody>
            <tfoot></tfoot>
        </table>
        </>
    )
}

export default memo(CustomersTable);