import axios from 'axios';
import React, { useEffect } from 'react';
import UseAuth from './useAuth';
import { useNavigate } from 'react-router';

const useAxiosSecure = () => {


const {user, logOut} = UseAuth();
const navigate = useNavigate();
const axiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})


useEffect( ()=>{

   const requestInterceptors = axiosSecure.interceptors.request.use(config => {
        

        // intercept request 
        config.headers.Authorization = `Bearer ${user?.accessToken}`



        return config;
    })

    const responseInterceptors = axiosSecure.interceptors.response.use( (response)=>{
        return response;
    }, (err)=>{


        const statusCode = err.status;
        if(statusCode === 401 || statusCode === 403){
 logOut()
 .then(result=> {
    console.log(result)
    navigate('/login')
 })
        }


        return Promise.reject(err)

    })

    return ()=>{
axiosSecure.interceptors.request.eject(requestInterceptors)
axiosSecure.interceptors.response.eject(responseInterceptors)
    }


},[user,navigate, logOut])



    return axiosSecure;
};

export default useAxiosSecure;