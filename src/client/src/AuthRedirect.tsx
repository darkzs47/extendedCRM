import {useSelector} from "react-redux";
import type {RootState} from "./store/store.ts";
import {memo} from "react";
import Login from "./pages/Login.tsx";
import Main from "./pages/Main.tsx";

const AuthRedirect = () => {
    const isAuthUser = useSelector((state: RootState) => state.user.isAuthUser);

    return (
        <>
            {isAuthUser ? <Main/> : <Login/>}
        </>
    )
};

export default memo(AuthRedirect);