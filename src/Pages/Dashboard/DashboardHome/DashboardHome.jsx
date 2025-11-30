import React from 'react';
import useRole from '../../../Hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {

    const {role, roleLoading} = useRole();

if(roleLoading){
    return <span className="loading loading-spinner loading-lg"></span>
}

if(role === 'admin'){
    return <AdminDashboardHome></AdminDashboardHome>
}

 else if(role === 'rider'){
    return <RiderDashboardHome></RiderDashboardHome>
}
else{
    return <UserDashboardHome></UserDashboardHome>
}

};

export default DashboardHome;