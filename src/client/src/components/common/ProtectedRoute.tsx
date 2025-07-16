import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import type {RootState} from '../../store/store.ts';
import {type ReactNode,} from "react";

interface Props {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {

    const isAuthUser = useSelector((state: RootState) => state.currentUser.isAuthUser);
    const isLoading = useSelector((state: RootState) => state.currentUser.isLoading);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isAuthUser) {
        return <>{children}</>;
    }
    console.log('Auth:', isAuthUser, `Load:`, isLoading);

    return <Navigate to="/login" />;
};

export default ProtectedRoute;