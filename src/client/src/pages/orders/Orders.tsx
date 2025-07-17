import {type FC, memo, useCallback} from "react";
import AddIdentityButton from "../../components/common/AddIdentityButton/AddIdentityButton.tsx";
import {useNavigate} from "react-router-dom";
import OrdersTable from "../../components/tables/OrdersTable.tsx";
import styles from "./orders.module.scss"

const Orders: FC = () => {

    const navigate = useNavigate()

    const handleAddOrder = useCallback(() => {
        navigate('/orders/add')
    }, [])

    return (
        <main className={styles.ordersMain}>
            <div className={styles.headerContainer}>
                <h3>Заказы</h3>
                <AddIdentityButton
                    onClick={handleAddOrder}
                />
            </div>
            <OrdersTable/>
        </main>
    )
}

export default memo(Orders)