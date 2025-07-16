import {type FC, memo, useCallback} from "react";
import CustomersTable from "../layouts/CustomersTable.tsx";
import styles from "../styles/customersMain.module.scss"
import AddIdentityButton from "../components/AddIdentityButton.tsx";
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