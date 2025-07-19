import {useDispatch, useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
import type {AppDispatch, RootState} from '../../store/store.ts';
import type {UserRole} from "../../../../server/core/models/User/User.ts";
import {useEffect} from 'react';
import {checkAuth} from "../../store/currentUser/actions.ts";

interface Props {
    allowedRoles: UserRole[];
}

const ProtectedRoute = ({allowedRoles}: Props) => {
    const isAuthUser: boolean = useSelector((state: RootState) => state.currentUser.isAuthUser);
    const isLoading: boolean = useSelector((state: RootState) => state.currentUser.isLoading);
    const userRole: UserRole | undefined = useSelector((state: RootState) => state.currentUser.currentUser?.role)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(checkAuth())
    }, []);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!isAuthUser || !userRole) {
        return <Navigate to="/login" replace/>;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/404" replace/>;
    }

    return <Outlet/>;
};

export default ProtectedRoute;