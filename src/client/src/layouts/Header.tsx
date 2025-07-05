import {type FC, memo} from 'react'

import Navigation from "../components/Navigation.tsx";

const Header: FC = () => {
    return (
        <header>
            <Navigation/>
        </header>
    )
}

export default memo(Header);