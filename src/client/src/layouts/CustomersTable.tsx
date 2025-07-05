import {type FC, memo, useState} from "react";
import type {ICustomer} from "../models/ICustomer.ts";
import CustomerRow from "../components/CustomerRow.tsx";

const CustomersTable: FC = () => {

    const [customers, setCustomers] = useState<ICustomer[] | null>(null);

    return (
        <>
            <div>
            <a href='#' style={{width: '5rem', height: '5rem'}}>
                {/* ВЫНЕСТИ В КОМПОНЕНТ КНОПКУ И ИСПОЛЬЗОВАТЬ ЕЕ НА ВСЕХ СТРАНИЦАХ */}
                <svg xmlns="http://www.w3.org/2000/svg" style={{width: '2rem', height: '2rem'}} fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 4v16m8-8H4"/>
                </svg>
                Добавить
            </a>
        </div>
        <table>
            <thead>
            <tr>
                <th>Организация</th>
                <th>Email</th>
                <th>Телефон</th>
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