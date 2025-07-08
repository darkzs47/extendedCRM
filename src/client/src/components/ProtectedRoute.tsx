import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type {RootState} from '../store/store.ts';
import type {JSX} from "react";

interface Props {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
    const isAuthUser = useSelector((state: RootState) => state.currentUser.isAuthUser);

    return isAuthUser ? children : <Navigate to="/login" replace /> ;
};

export default ProtectedRoute;