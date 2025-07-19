import {Button, Input} from "antd";
import {type FC, type MouseEventHandler, useCallback, useEffect, useState} from "react";
import {memo} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/currentUser/actions.ts";
import type {AppDispatch, RootState} from "../../store/store.ts";
import styles from '../../pages/auth/login.module.scss';
import type {UserRole} from "../../../../server/core/models/User/User.ts";

const LoginForm: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const toRegisterPageHandler: MouseEventHandler = useCallback(() => {
            navigate('/register')
        }, [navigate]
    );

    const [authResult, setAuthResult] = useState<boolean>(false)

    const handleLogin: MouseEventHandler = useCallback(async () => {
            setAuthResult((await dispatch(login(email, password))).success)
        }, [email, password]
    );

    const currentUserRole: UserRole | undefined = useSelector((state: RootState) => state.currentUser.currentUser?.role)

    useEffect(() => {
        if (authResult) {
            if (currentUserRole === 'admin' || currentUserRole === 'employee') navigate('/customers')
            else if (currentUserRole === 'supplier') navigate('/tools')
            else navigate('/404');
        }
    }, [authResult, currentUserRole]);

    return (
        <div className={styles.loginContainer}>
            <h2>Вход в систему</h2>
            <div className={styles.loginForm}>
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Email'
                />
                <Input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    placeholder='Пароль'
                />
            </div>
            <div className={styles.buttonsContainer}>
                <Button
                    className={styles.loginButtons}
                    onClick={handleLogin}
                    type="primary"
                    htmlType="submit"
                >
                    Войти
                </Button>
                <Button
                    className={styles.loginButtons}
                    type="primary"
                    htmlType="button"
                    onClick={toRegisterPageHandler}
                >
                    Регистрация
                </Button>
            </div>
        </div>
    )
}

export default memo(LoginForm);