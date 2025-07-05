import {useSelector} from "react-redux";
import type {RootState} from "./store/store.ts";
import {memo} from "react";
import Login from "./pages/Login.tsx";
import Main from "./pages/AdminMain.tsx";

const AuthRedirect = () => {
    const isAuthUser = useSelector((state: RootState) => state.currentUser.isAuthUser);

    return (
        <>
            {isAuthUser ? <Main/> : <Login/>}
        </>
    )
};

export default memo(AuthRedirect);