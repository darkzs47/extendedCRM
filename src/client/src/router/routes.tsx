import ProtectedRoute from "../components/common/ProtectedRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Users from "../pages/users/Users.tsx";
import CoefficientsSeason from "../components/tables/CoefficientsSeason.tsx";
import Admin from "../pages/admin/Admin.tsx";
import CustomerInfo from "../pages/customers/CustomerInfo.tsx";
import AddCustomer from "../pages/customers/AddCustomer.tsx";
import Customers from "../components/tables/Customers";
import Categories from "../pages/categories/Categories.tsx";
import {Navigate} from "react-router-dom";
import OrderInfo from "../pages/orders/OrderInfo.tsx";
import AddOrder from "../pages/orders/AddOrder.tsx";
import Orders from "../pages/orders/Orders.tsx";
import Tools from "../pages/tools/Tools.tsx";
import AddSupplier from "../pages/suppliers/AddSupplier.tsx";
import SupplierInfo from "../pages/suppliers/SupplierInfo.tsx";
import Suppliers from "../pages/suppliers/Suppliers.tsx";

const routes = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },

    {
        path: '/',
        element: <ProtectedRoute><Customers /></ProtectedRoute>
    },

    {
        path: '/admin',
        element: <ProtectedRoute><Admin /></ProtectedRoute>,
        children: [
            { index: true, element: <ProtectedRoute><Users /></ProtectedRoute> },
            { path: 'users', element: <ProtectedRoute><Users /></ProtectedRoute> },
            { path: 'coefficients/season', element: <ProtectedRoute><CoefficientsSeason /></ProtectedRoute> },
            { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> }
        ]
    },

    {
        path: '/customers',
        element: <ProtectedRoute><Customers /></ProtectedRoute>
    },
    {
        path: '/customers/:id',
        element: <ProtectedRoute><CustomerInfo /></ProtectedRoute>
    },
    {
        path: '/customers/add',
        element: <ProtectedRoute><AddCustomer /></ProtectedRoute>
    },

    {
        path: '/suppliers',
        element: <ProtectedRoute><Suppliers /></ProtectedRoute>
    },
    {
        path: '/suppliers/:id',
        element: <ProtectedRoute><SupplierInfo /></ProtectedRoute>
    },
    {
        path: '/suppliers/add',
        element: <ProtectedRoute><AddSupplier /></ProtectedRoute>
    },

    {
        path: '/tools',
        element: <ProtectedRoute><Tools /></ProtectedRoute>
    },
    {
        path: '/orders',
        element: <ProtectedRoute><Orders /></ProtectedRoute>
    },
    {
        path: '/orders/add',
        element: <ProtectedRoute><AddOrder /></ProtectedRoute>
    },
    {
        path: '/orders/:id',
        element: <ProtectedRoute><OrderInfo /></ProtectedRoute>
    },

    { path: '*', element: <Navigate to="/" /> }
];

export default routes;