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
import ProtectedRoute from "./components/ProtectedRoute.tsx";
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
                        <Route path="/login" element={
                            <ProtectedRoute><Login /></ProtectedRoute>} />
                        <Route path="/register" element={
                            <ProtectedRoute><Register /></ProtectedRoute>} />

                        <Route path="/" element={
                            <ProtectedRoute><Customers /></ProtectedRoute>
                        } />
                        <Route path="/admin" element={
                            <ProtectedRoute><AdminMain /></ProtectedRoute>
                        } />
                        <Route path="/customers" element={
                            <ProtectedRoute><Customers /></ProtectedRoute>
                        } />
                        <Route path="/customers/:id" element={
                            <ProtectedRoute><CustomerInfo /></ProtectedRoute>
                        } />
                        <Route path="/customers/add" element={
                            <ProtectedRoute><AddCustomer /></ProtectedRoute>
                        } />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
            </Router>
        </>
    )
}

export default React.memo(App)
