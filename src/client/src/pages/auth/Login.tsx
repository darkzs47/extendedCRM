import {memo, type FC} from 'react'
import LoginForm from "../../components/auth/LoginForm.tsx";

const Login: FC = () => {

    return (
        <main>
            <LoginForm/>
        </main>
    )
}

export default memo(Login);