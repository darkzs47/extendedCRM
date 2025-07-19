import './App.scss';
import 'antd/dist/reset.css';
import React, {useEffect} from "react";
import Header from "./components/common/Header.tsx";
import {checkAuth} from "./store/currentUser/actions.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "./store/store.ts";
import {BrowserRouter as Router} from "react-router";
import AppRoutes from "./router/routes.tsx";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (localStorage.getItem("token")) dispatch(checkAuth())
    }, [])

    return (
        <Router>
            <Header/>
            <AppRoutes/>
        </Router>
    )
}

export default React.memo(App)
