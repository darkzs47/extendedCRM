import './App.scss';
import 'antd/dist/reset.css';
import React, {useEffect} from "react";
import Header from "./layouts/Header.tsx";
import {checkAuth} from "./store/currentUser/actions.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "./store/store.ts";
import Login from "./pages/Login.tsx";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Register from "./pages/Register.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import {BrowserRouter as Router} from "react-router";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Customers from "./pages/Customers.tsx";
import CustomerInfo from "./pages/CustomerInfo.tsx";
import AddCustomer from "./pages/AddCustomer.tsx";
import Suppliers from "./pages/Suppliers.tsx";
import SupplierInfo from "./pages/SupplierInfo.tsx";
import AddSupplier from "./pages/AddSupplier.tsx";
import Users from "./pages/Users.tsx";
import Categories from "./pages/Categories.tsx";
import Tools from "./pages/Tools.tsx";
import CoefficientsDistance from "./pages/CoefficientsDistance.tsx";
import CoefficientsSeason from "./pages/CoefficientsSeason.tsx";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (localStorage.getItem("token")) dispatch(checkAuth())
    }, [])

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/login" element={
                    <Login/>}/>
                <Route path="/register" element={
                    <Register/>}/>

                <Route path="/" element={
                    <ProtectedRoute><Customers/></ProtectedRoute>
                }/>
                <Route path="/admin" element={
                    <ProtectedRoute><AdminPanel/></ProtectedRoute>
                }>
                    <Route index element={<ProtectedRoute><Users/></ProtectedRoute>}/>
                    <Route path="users" element={<ProtectedRoute><Users/></ProtectedRoute>}/>
                    <Route path="coefficients/distance" element={<ProtectedRoute><CoefficientsDistance/></ProtectedRoute>}/>
                    <Route path="coefficients/season" element={<ProtectedRoute><CoefficientsSeason/></ProtectedRoute>}/>
                    <Route path="categories" element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
                </Route>
                <Route path="/customers" element={
                    <ProtectedRoute><Customers/></ProtectedRoute>}>
                </Route>
                <Route path="/customers/:id" element={
                    <ProtectedRoute><CustomerInfo/></ProtectedRoute>
                }/>
                <Route path="/customers/add" element={
                    <ProtectedRoute><AddCustomer/></ProtectedRoute>
                }/>
                <Route path="/suppliers" element={
                    <ProtectedRoute><Suppliers/></ProtectedRoute>
                }/>
                <Route path="/suppliers/:id" element={
                    <ProtectedRoute><SupplierInfo/></ProtectedRoute>
                }/>
                <Route path="/suppliers/add" element={
                    <ProtectedRoute><AddSupplier/></ProtectedRoute>
                }/>

                <Route path="/tools" element={
                    <ProtectedRoute><Tools/></ProtectedRoute>
                }/>

                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Router>
    )
}

export default React.memo(App)
