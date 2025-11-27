import React from 'react';
import UseAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const AdminRoutes = ({children}) => {

const { loading} = UseAuth();

const {role, roleLoading} = useRole();

if(loading || roleLoading){
    return <span className="loading loading-spinner loading-lg"></span>
}

if(role !== 'admin'){
    return <div className='text-center font-bold text-5xl'><p>Access is Forbidden</p></div>
}

    return children;
};

export default AdminRoutes;