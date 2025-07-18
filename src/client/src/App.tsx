import './App.scss';
import 'antd/dist/reset.css';
import React, {useEffect} from "react";
import Header from "./components/common/Header.tsx";
import {checkAuth} from "./store/currentUser/actions.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "./store/store.ts";
import {Route, Routes} from "react-router-dom";
import {BrowserRouter as Router} from "react-router";
import routes from "./router/routes.tsx";

const renderRoutes = (routes: any) =>
    routes.map(({ path, element, children, index }, i) => (
        <Route key={i} path={path} element={element} index={index}>
            {children && renderRoutes(children)}
        </Route>
    ));

function App() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (localStorage.getItem("token")) dispatch(checkAuth())
    }, [])

    return (
        <Router>
            <Header/>
            <Routes>
                {renderRoutes(routes)}
            </Routes>
        </Router>
    )
}

export default React.memo(App)
