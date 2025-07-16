import {type FC, memo} from "react";
import UsersTable from "../layouts/UsersTable.tsx";
import styles from "../styles/usersMain.module.scss"

const Users: FC = () => {
    return (
        <div className={styles.usersMain}>
            <h3>Пользователи</h3>
            <UsersTable/>
        </div>
    )
}

export default memo(Users)