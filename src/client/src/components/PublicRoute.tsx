import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type {RootState} from '../store/store.ts';
import type {JSX} from "react";

interface Props {
    children: JSX.Element;
}

const PublicRoute = ({ children }: Props) => {
    const isAuthUser = useSelector((state: RootState) => state.currentUser.isAuthUser);

    return isAuthUser ? children : <Navigate to="/" replace /> ;
};

export default PublicRoute;