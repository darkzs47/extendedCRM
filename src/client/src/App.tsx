import './App.css';
import 'antd/dist/reset.css';
import React, {useEffect} from "react";
import Header from "./layouts/Header.tsx";
import {checkAuth} from "./store/user/actions.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./store/store.ts";
import Login from "./pages/Login.tsx";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const {isAuthUser} = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (localStorage.getItem("token")) dispatch(checkAuth())
    }, [])

    if (!isAuthUser) {
        return (
            <>
                <Login/>
            </>
        )
    }

    return (
        <>
         <Header/>
            Успешная авторизация
        </>
    )
}

export default React.memo(App)
