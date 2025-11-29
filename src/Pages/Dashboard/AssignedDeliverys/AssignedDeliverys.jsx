import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AssignedDeliverys = () => {

    const {user} = UseAuth();
    const axiosSecure = useAxiosSecure()
const {data:parcels=[], refetch} = useQuery({
    queryKey: ['parecels', user?.email, 'driver_assigned'],
    queryFn:async()=>{
        const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`)
        return res.data;
    }
})




const handleDeliveryStatusUpdate = (parcel, status)=>{

let message = `Parcel status is updated with ${status.split('_').join(' ')}`

const statusInfo = {
    deliveryStatus: status,
riderId: parcel.riderId,
trackingId:parcel.trackingId
}
axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
.then(res => 
{
    if(res.data.modifiedCount){
        refetch()
        Swal.fire({
            position: 'top-end',
            icon: 'success', 
            title:message,
            showConfirmButton:false,
            timer:1500,
        })
    }
}
)

}

// ToDo: handleRejectDelivery


    return (
        <div>
            <h3 className='text-4xl text-secondary font-bold'>Parcels pending Pickup: {parcels.length}</h3>
        
        
        <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Confirm</th>
        <th>Other Actions</th>
      </tr>
    </thead>
    <tbody>
 {
    parcels.map((parcel, index) =>   <tr key={parcel._id}>
        <th>{index + 1}</th>
        <td>{parcel.parcelName}</td>
        <td>
            {
                parcel.deliveryStatus === 'driver-assigned' ? <>
                <button onClick={()=>handleDeliveryStatusUpdate(parcel,'rider_arriving')} className='btn btn-primary text-black m-2'>Accept</button>
            <button className='btn btn-warning m-2 text-black'>Reject</button>
            </> : <span>Accepted</span>
                }
        </td>
        <td className='flex gap-2'>
            <button onClick={()=>handleDeliveryStatusUpdate(parcel,'parcel-picked-up')} className='btn btn-primary text-black m-2'>Marked as Picked Up</button>
            <button onClick={()=>handleDeliveryStatusUpdate(parcel,'parcel_delivered')} className='btn btn-primary text-black m-2'>Mark as Delivered</button>
        </td>
      </tr>)
 }

    

    </tbody>
  </table>
</div>
        </div>
    );
};

export default AssignedDeliverys;