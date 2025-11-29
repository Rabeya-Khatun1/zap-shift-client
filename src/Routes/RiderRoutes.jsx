import React from 'react';
import UseAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const RiderRoutes = ({children}) => {

const {loading,user} = UseAuth();
const {role, roleLoading} = useRole();
if(loading || !user || roleLoading){
return <span className="loading loading-spinner loading-lg"></span>

}

if(role !== 'rider'){

return <div className='text-center font-bold text-5xl'><p>Access is Forbidden</p></div>

}

    return children;
};

export default RiderRoutes;