import {type FC, memo} from "react";

const OrdersTable: FC = () => {
    return (
        <table>
            <thead>
            <tr>
                <th>Заказчик</th>
                <th>Дата создания</th>
                <th>Дата завершения</th>
                <th>Статус</th>
                <th>Сумма</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    )
}

export default memo(OrdersTable)