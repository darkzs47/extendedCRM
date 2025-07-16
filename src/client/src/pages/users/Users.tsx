import {type FC, memo} from "react";
import UsersTable from "../../components/tables/Users.tsx";
import styles from "./users.module.scss"

const Users: FC = () => {
    return (
        <div className={styles.usersMain}>
            <h3>Пользователи</h3>
            <UsersTable/>
        </div>
    )
}

export default memo(Users)