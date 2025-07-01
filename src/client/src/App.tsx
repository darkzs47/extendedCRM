import './App.css';
import 'antd/dist/reset.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NewUserForm from "./components/NewUserForm.tsx";
import Main from "./pages/Main.tsx"
import Header from "./layouts/Header.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

function App() {

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/users/add" element={<NewUserForm/>}/>
            </Routes>
        </Router>
    )
}

export default React.memo(App)
