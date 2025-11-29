import React from 'react';
import UseAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {


    const {user} =UseAuth();
    const axiosSecure = useAxiosSecure();

    const {data: parcels=[]} = useQuery({
        queryKey: ['parcels', user?.email, 'driver_assigned'],
        queryFn: async()=>{

const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`)
return res.data

        }
    })

const calculatePayout = parcel => {
    if(parcel.senderDistrict === parcel.recieverDistrict){
        return parcel.cost * 0.8
    }
    else{
        return parcel.cost * 0.6
    }
}



    return (
        <div>
            <h3 className='text-4xl text-secondary font-bold'>Completed Deliveries : {parcels.length}</h3>
        
                 <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Create At</th>
                            <th>Pickup District</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>{()=>calculatePayout(parcel)}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>
                                    <button  className='btn btn-primary text-black'>Cash Out</button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        
        </div>
    );
};

export default CompletedDeliveries;