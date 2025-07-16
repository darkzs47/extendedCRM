import {memo, type FC} from 'react'
import RegisterForm from "../../components/auth/RegisterForm.tsx";

const Register: FC = () => {

    return (
        <main>
            <RegisterForm/>
        </main>
    )
}

export default memo(Register);