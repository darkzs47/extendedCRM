import {type FC, memo} from 'react'
import {NavLink, Outlet} from 'react-router-dom';
import styles from "../styles/admin.module.scss"

const AdminPanel: FC = () => {

    return (
        <main className={styles.adminMain}>
            <div className={styles.adminMainContainer}>
                <nav className={styles.adminMainNav}>
                    <ul>
                        <li><NavLink to="users">Пользователи</NavLink></li>
                        <li><NavLink to='coefficients/distance'>Коэффициенты дистанции</NavLink></li>
                        <li><NavLink to='coefficients/season'>Коэффициенты сезонности</NavLink></li>
                        <li><NavLink to='categories'>Категории инструментов</NavLink></li>
                    </ul>
                </nav>
                <div>
                    <Outlet/>
                </div>
            </div>
        </main>
    )
}

export default memo(AdminPanel);