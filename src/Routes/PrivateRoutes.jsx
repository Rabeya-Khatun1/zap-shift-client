import React from 'react';
import UseAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {

    const { user, loading } = UseAuth();
    const location = useLocation()


    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if (!user) {
        return <Navigate state={location?.pathname} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoutes;