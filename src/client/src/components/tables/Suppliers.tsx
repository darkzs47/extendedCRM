import {type FC, memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {getAllSuppliers} from "../../store/suppliers/actions.ts";
import SupplierRow from "./rows/Supplier.tsx";
import styles from "../../pages/suppliers/suppliers.module.scss"

const Suppliers: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const suppliers = useSelector((state: RootState) => state.suppliers.suppliers)

    useEffect(() => {
        dispatch(getAllSuppliers());
    }, [dispatch]);

    return (
        <div className={styles.suppliersMainContainer}>
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
                {suppliers?.map((supplier) =>
                    <tr key={supplier.id}>
                        <SupplierRow
                            supplier={supplier}
                        />
                    </tr>
                )}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

export default memo(Suppliers);