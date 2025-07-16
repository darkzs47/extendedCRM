import {type FC, memo, useEffect} from "react";
import CustomerRow from "./rows/Customer.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {getAllCustomers} from "../../store/customers/actions.ts";
import styles from "../../pages/customers/customers.module.scss"

const Customers: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const customers = useSelector((state: RootState) => state.customers.customers)

    useEffect(() => {
        dispatch(getAllCustomers());
    }, [dispatch]);

    return (
        <div className={styles.customersMainContainer}>
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
        </div>
    )
}

export default memo(Customers);