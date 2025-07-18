import {type FC, memo} from 'react'
import {NavLink, Outlet} from 'react-router-dom';
import styles from "./admin.module.scss"

const Admin: FC = () => {

    return (
        <main className={styles.adminMain}>
            <div className={styles.adminMainContainer}>
                <nav className={styles.adminMainNav}>
                    <ul>
                        <li><NavLink to="users">Пользователи</NavLink></li>
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

export default memo(Admin);