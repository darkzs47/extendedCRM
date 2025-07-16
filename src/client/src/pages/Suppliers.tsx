import {type FC, memo, useCallback} from "react";
import SuppliersTable from "../layouts/SuppliersTable.tsx";
import styles from "../styles/suppliersMain.module.scss"
import AddIdentityButton from "../components/AddIdentityButton.tsx";
import {useNavigate} from "react-router-dom";

const Suppliers: FC = () => {

    const navigate = useNavigate()

    const handleAddSupplier = useCallback(() => {
         navigate(`/suppliers/add`)
     }, [])

    return (
        <main className={styles.suppliersMain}>
            <div className={styles.headerContainer}>
                <h3>Поставщики</h3>
                <AddIdentityButton
                    onClick={handleAddSupplier}
                />
            </div>
            <SuppliersTable/>
        </main>
    )
}

export default memo(Suppliers);