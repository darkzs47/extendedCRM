import {type FC, memo} from 'react'

import Navigation from "./navigation/Navigation.tsx";

const Header: FC = () => {
    return (
        <header>
            <Navigation/>
        </header>
    )
}

export default memo(Header);