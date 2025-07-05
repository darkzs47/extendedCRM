import {type FC, memo} from "react";
import CustomersTable from "../layouts/CustomersTable.tsx";

const Customers: FC = () => {


    return (
        <main>
            <h3>Клиенты</h3>
            <CustomersTable/>
        </main>
    )
}

export default memo(Customers);