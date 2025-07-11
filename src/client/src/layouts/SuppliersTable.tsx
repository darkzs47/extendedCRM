import {type FC, memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import AddIdentityButton from "../components/AddIdentityButton.tsx";
import {getAllSuppliers} from "../store/suppliers/actions.ts";
import SupplierRow from "../components/SupplierRow.tsx";

const SuppliersTable: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const suppliers = useSelector((state: RootState) => state.suppliers.suppliers)

    useEffect(() => {
        dispatch(getAllSuppliers());
    }, [dispatch]);

    return (
        <>
            <AddIdentityButton identity={"suppliers"}/>
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
        </>
    )
}

export default memo(SuppliersTable);