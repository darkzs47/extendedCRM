import {type FC, memo} from 'react'
import UsersTable from "../layouts/UsersTable.tsx";

const Main: FC = () => {

    return (
        <main>
            <UsersTable/>
        </main>
    )
}

export default memo(Main);