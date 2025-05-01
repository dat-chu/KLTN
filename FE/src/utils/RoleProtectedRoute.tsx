import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import _ from 'lodash';
import { JSX } from 'react';
import { ROUTER } from '../helpers/constant';

interface RoleProtectedRouteProps {
    allowedRoles: number[]; // e.g. ['admin' - 1, 'candidate' - 2,  'recruiter' - 3]
    children: JSX.Element;
}

const RoleProtectedRoute = ({ allowedRoles, children }: RoleProtectedRouteProps) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = !_.isEmpty(user);
    const userRole = user.user?.role_id;

    if (!isAuthenticated) {
        return <Navigate to={ROUTER.LOGIN} replace />;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to={ROUTER.UNAUTHOZIZED} replace />;
    }

    return children;
};

export default RoleProtectedRoute;
