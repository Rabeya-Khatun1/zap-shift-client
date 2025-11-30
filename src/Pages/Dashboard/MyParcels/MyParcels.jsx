import React from 'react';
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../Hooks/useAuth'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels =  () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

const {data: parcels=[], refetch} =useQuery({
    queryKey: ['myParcels', user?.email], 
    queryFn:async ()=>{
        const res = await axiosSecure.get(`/parcels?email=${user.email}`)
        return res.data;
    }
})

    // const { data: parcels = [] , refetch} = useQuery({
    //     queryKey: ['myParcels', user?.email],
    //     queryFn: async () => {

    //         const res = await axiosSecure.get(`/parcels?email=${user?.email}`)
    //         return res.data;
    //     }
    // })
const handleParcelDelete = id => {

Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

    axiosSecure.delete(`/parcels/${id}`)
    .then(res => {
        console.log(res.data)
        if(res.data.deletedCount){
            // refresh the data in the ui 
refetch()

                     Swal.fire({
      title: "Deleted!",
      text: "Your parcel request has been deleted.",
      icon: "success"
    });  
        }
 
    })
    .catch(error => {
        console.log(error)
    })



  }
});

}

const handlePayment = async(parcel)=>{

const paymentInfo = {
    cost: parcel.cost,
    parcelId: parcel._id,
    senderEmail: parcel.senderEmail,
    parcelName: parcel.parcelName,
    trackingId: parcel.trackingId
}

const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
window.location.assign(res.data.url)

}

    return (
        <div>
            <h3>All of my parcels: {parcels.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Tracking ID</th>
                            <th>Delivery status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th> {index +1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>
                                    {
                                        parcel.paymentStatus === 'paid' ? <span className='text-green-400'>Paid</span> : <button onClick={()=>handlePayment(parcel)} className="btn btn-small btn-primary">Pay</button>
                                    }
                                </td>
                                <td>
                                  <Link to={`/parcel-track/${parcel.trackingId}`}>  {parcel.trackingId}</Link>
                                </td>
                                <td>
                                    {parcel.deliveryStatus}
                                </td>
                                <td className='flex gap-3'>
                                    <button className='btn btn-square'><FaSearch /></button>
                                    <button className='btn btn-square'> <FaEdit /></button>
                                    <button onClick={()=>handleParcelDelete(parcel._id)} className='btn btn-square'><MdDelete /></button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyParcels;