import ProtectedRoute from "../components/common/ProtectedRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Users from "../pages/users/Users.tsx";
import CoefficientsSeason from "../pages/coefficients/CoefficientsSeason.tsx";
import Admin from "../pages/admin/Admin.tsx";
import CustomerInfo from "../pages/customers/CustomerInfo.tsx";
import AddCustomer from "../pages/customers/AddCustomer.tsx";
import Customers from "../pages/customers/Customers";
import Categories from "../pages/categories/Categories.tsx";
import {Route, Routes} from "react-router-dom";
import OrderInfo from "../pages/orders/OrderInfo.tsx";
import AddOrder from "../pages/orders/AddOrder.tsx";
import Orders from "../pages/orders/Orders.tsx";
import Tools from "../pages/tools/Tools.tsx";
import AddSupplier from "../pages/suppliers/AddSupplier.tsx";
import SupplierInfo from "../pages/suppliers/SupplierInfo.tsx";
import Suppliers from "../pages/suppliers/Suppliers.tsx";
import NotFound from "../pages/NotFound/NotFound.tsx";

const AppRoutes = () => (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}>
            <Route path="/" element={<Customers />} />
        </Route>

        <Route element={<ProtectedRoute  allowedRoles={['admin']}/>}>
            <Route path="/admin" element={<Admin />}>
                <Route index element={<Users />} />
                <Route path="users" element={<Users />} />
                <Route path="coefficients/season" element={<CoefficientsSeason />} />
                <Route path="categories" element={<Categories />} />
            </Route>
        </Route>

        <Route element={<ProtectedRoute  allowedRoles={['admin', 'employee']}/>}>
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/customers/:id" element={<CustomerInfo />} />
        </Route>

        <Route element={<ProtectedRoute  allowedRoles={['admin', 'employee']}/>}>
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/add" element={<AddSupplier />} />
            <Route path="/suppliers/:id" element={<SupplierInfo />} />
        </Route>

        <Route element={<ProtectedRoute  allowedRoles={['admin', 'employee', 'supplier']}/>}>
            <Route path="/tools" element={<Tools />} />
        </Route>

        <Route element={<ProtectedRoute  allowedRoles={['admin', 'employee']}/>}>
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/add" element={<AddOrder />} />
            <Route path="/orders/:id" element={<OrderInfo />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;