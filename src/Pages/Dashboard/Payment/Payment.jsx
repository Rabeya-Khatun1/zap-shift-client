import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Payment = () => {

const {parcelId} = useParams();
const axiosSecure = useAxiosSecure();
const {isLoading,data: parcel} =useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async()=> {
      const res = await axiosSecure.get(`/parcels/${parcelId}`)
     return res.data
    }
})

if(isLoading){
   return <span className="loading loading-spinner loading-lg"></span>
}

    return (
        <div>
            <h3>Please Pay: {parcel.parcelName}</h3>
            <button className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;