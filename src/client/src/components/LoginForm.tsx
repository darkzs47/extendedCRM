import {Button, Input} from "antd";
import {type FC, type MouseEventHandler, useCallback, useState} from "react";
import {memo} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/user/actions.ts";
import type {AppDispatch} from "../store/store.ts";
import type {RootState} from "../store/store.ts";

const LoginForm: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {isAuthUser, user} = useSelector((state: RootState) => state.user)
    console.log(isAuthUser, user)
    const toRegisterPageHandler: MouseEventHandler = useCallback(() => {
            navigate('/register')
        }, [navigate]
    );

    const handleLogin: MouseEventHandler = useCallback(() => {
            dispatch(login(email, password));
        }, [email, password]
    );

    return (
        <div style={{width: '300px', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Email'
                />
                <Input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    placeholder='Password'
                />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button onClick={handleLogin} type="primary" htmlType="submit">
                    Войти
                </Button>
                <Button type="primary" htmlType="button" onClick={toRegisterPageHandler}>
                    Регистрация
                </Button>
            </div>
        </div>
    )
}

export default memo(LoginForm);