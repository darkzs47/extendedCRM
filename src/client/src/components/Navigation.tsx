import {type FC, memo, type MouseEventHandler, useCallback} from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {Button} from "antd";
import {logout} from "../store/currentUser/actions.ts";

const Navigation: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthUser = useSelector((state: RootState) => state.currentUser.isAuthUser)
    const userRole = useSelector((state: RootState) => state.currentUser.currentUser?.role)
    const handleLogout: MouseEventHandler = useCallback(() => {
            dispatch(logout());
            navigate('/')
        }, [navigate, dispatch]
    );

    return (
        <nav>
            <ul>
                {isAuthUser && (
                    <>
                        {userRole === 'admin' && (
                            <>
                                <li>
                                    <NavLink to="/admin">Админ-панель</NavLink>
                                </li>
                            </>
                        )}

                        {userRole === 'employee' || userRole === 'admin' && (
                            <>
                                <li>
                                    <NavLink to="/orders">Заказы</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/clients">Клиенты</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/suppliers">Поставщики</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/tools">Инструменты</NavLink>
                                </li>
                            </>
                        )}
                        <Button type="primary" htmlType="button" onClick={handleLogout}>
                            Выйти
                        </Button>
                    </>
                )}
            </ul>
        </nav>
    )
};

export default memo(Navigation);