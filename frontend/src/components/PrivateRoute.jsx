import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (!token) {
        return <Navigate to="/" />;
    }
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default PrivateRoute;
