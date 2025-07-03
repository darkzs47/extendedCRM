import {memo, type FC, type MouseEventHandler, useCallback} from 'react'
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

const Register: FC = () => {
    const navigate = useNavigate();

    const toLoginPageHandler: MouseEventHandler = useCallback(() => {
        navigate('/')
    }, [navigate])
    return (
        <main>
            register page

            <Button type="primary" htmlType="button" onClick={toLoginPageHandler}>
                Уже зарегистрированы?
            </Button>
        </main>
    )
}

export default memo(Register);