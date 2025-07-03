import {type FC, memo, type MouseEventHandler, useCallback} from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {Button} from "antd";
import {logout} from "../store/user/actions.ts";

const Navigation: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAuthUser = useSelector((state: RootState) => state.user.isAuthUser)
    console.log(isAuthUser)
    const handleLogout: MouseEventHandler = useCallback(() => {
            dispatch(logout());
            navigate('/')
        }, [navigate, dispatch]
    );

    return (
        <nav>
            <ul>
                {!isAuthUser ? (
                    <>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Register</NavLink>
                        </li>
                    </>
                ) : (
                    <Button type="primary" htmlType="button" onClick={handleLogout}>
                        Выйти
                    </Button>
                )}

                <li>
                    <NavLink to="/users/add">add</NavLink>
                </li>


            </ul>
        </nav>
    )
}

export default memo(Navigation);