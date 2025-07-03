import {memo, type FC} from 'react'
import LoginForm from "../components/LoginForm.tsx";
import Header from "../layouts/Header.tsx";

const Login: FC = () => {

    return (
        <>
            <Header/>
            <main>
                <LoginForm/>
            </main>
        </>)
}

export default memo(Login);