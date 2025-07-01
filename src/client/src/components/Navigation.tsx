import {type FC, memo} from 'react'
import {NavLink} from "react-router-dom";

const Navigation: FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                    <NavLink to="/users/add">add</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default memo(Navigation);