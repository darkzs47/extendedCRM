import {type FC, memo, useCallback} from "react";
import CustomersTable from "../../components/tables/Customers.tsx";
import styles from "./customers.module.scss"
import AddIdentityButton from "../../components/common/AddIdentityButton/AddIdentityButton.tsx";
import {useNavigate} from "react-router-dom";

const Customers: FC = () => {

    const navigate = useNavigate()

    const handleAddCustomer = useCallback(() => {
        navigate(`/customers/add`)
    }, [])

    return (
        <main className={styles.customersMain}>
            <div className={styles.headerContainer}>
                <h3>Клиенты</h3>
                <AddIdentityButton
                    onClick={handleAddCustomer}
                />
            </div>
            <CustomersTable/>
        </main>
    )
}

export default memo(Customers);