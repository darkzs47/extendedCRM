import {type FC, memo} from 'react'

import Navigation from "../components/Navigation.tsx";

const Header: FC = () => {
    return (
        <header>
            <Navigation/>

            <h3>
                Project
            </h3>

        </header>
    )
}

export default memo(Header);