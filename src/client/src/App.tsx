import './App.css';
import 'antd/dist/reset.css';
import React, {useEffect} from "react";
import Header from "./layouts/Header.tsx";
import {checkAuth} from "./store/currentUser/actions.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "./store/store.ts";
import Login from "./pages/Login.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Register from "./pages/Register.tsx";
import AdminMain from "./pages/AdminMain.tsx";
import {BrowserRouter as Router} from "react-router";
import AuthRedirect from "./AuthRedirect.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import Customers from "./pages/Customers.tsx";
import CustomerInfo from "./pages/CustomerInfo.tsx";
import AddCustomer from "./pages/AddCustomer.tsx";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (localStorage.getItem("token")) dispatch(checkAuth())
    }, [])

    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<AuthRedirect />} />
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    <Route path="/register" element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } />
                    <Route path="/admin" element={<AdminMain/>}/>

                    <Route path="/customers" element={<Customers/>}/>
                    <Route path="/customers/:id" element={<CustomerInfo/>}/>
                    <Route path="/customers/add" element={<AddCustomer/>}/>

                    <Route path="*" element={<Navigate to="/" />}/>
                </Routes>
            </Router>
        </>
    )
}

export default React.memo(App)
