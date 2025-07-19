import {type FC, memo, type MouseEventHandler, useCallback} from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {Button} from "antd";
import {logout} from "../../../store/currentUser/actions.ts";
import styles from "./navigation.module.scss"
import {LogoutOutlined} from '@ant-design/icons';

const Navigation: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthUser = useSelector((state: RootState) => state.currentUser.isAuthUser)
    const userRole = useSelector((state: RootState) => state.currentUser.currentUser?.role)
    const handleLogout: MouseEventHandler = useCallback(() => {
            dispatch(logout());
            navigate('/login')
        }, [navigate, dispatch]
    );

    return (
        <>{isAuthUser && (
                <nav className={styles.navbar}>
                    <ul className={styles.mainUl}>
                        <>
                            {userRole === 'admin' && (
                                <>
                                    <li>
                                        <NavLink className={styles.navLink} to="/admin">Админ-панель</NavLink>
                                    </li>
                                </>
                            )}

                            {(userRole === 'employee' || userRole === 'admin') && (
                                <>
                                    <li>
                                        <NavLink className={styles.navLink} to="/orders">Заказы</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={styles.navLink} to="/customers">Клиенты</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={styles.navLink} to="/suppliers">Поставщики</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={styles.navLink} to="/tools">Инструменты</NavLink>
                                    </li>
                                </>
                            )}

                            {userRole === 'supplier' && (
                                <>
                                    <li>
                                        <NavLink className={styles.navLink} to="/tools">Инструменты</NavLink>
                                    </li>
                                </>
                            )}
                        </>
                    </ul>
                    <Button
                        className={styles.logoutButton}
                        type="default"
                        danger
                        icon={<LogoutOutlined/>}
                        htmlType="button"
                        onClick={handleLogout}
                    >
                        Выйти
                    </Button>
                </nav>
            )}</>
    )
}

export default memo(Navigation);