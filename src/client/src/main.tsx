import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Main from "./pages/Main.tsx";
import NewUserForm from "./components/NewUserForm.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/main" element={<Main/>}/>
                    <Route path="/users/add" element={<NewUserForm/>}/>
                </Routes>
            </Router>
        </Provider>
    </StrictMode>,
)
