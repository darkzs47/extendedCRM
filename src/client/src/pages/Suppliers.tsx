import {type FC, memo} from "react";
import SuppliersTable from "../layouts/SuppliersTable.tsx";

const Suppliers: FC = () => {


    return (
        <main>
            <h3>Поставщики</h3>
            <SuppliersTable/>
        </main>
    )
}

export default memo(Suppliers);