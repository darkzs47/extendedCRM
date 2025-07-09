import {type FC, memo} from 'react'
import UsersTable from "../layouts/UsersTable.tsx";

const AdminPanel: FC = () => {

    return (
        <main>
            <h3>Страница администратора</h3>
            <UsersTable/>
        </main>
    )
}

export default memo(AdminPanel);