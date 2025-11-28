import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';



const AssignRiders = () => {

    const [selectedParcel, setSelectedParcel] = useState(null);
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], } = useQuery({

        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?delivery-status=pending-pickup')
            return res.data;
        }
    })

    const riderModalRef = useRef();
    // const senderDistrict = parcels.map(parcel => parcel.senderDistrict)
    // console.log(senderDistrict)

    // Todo: invalidate query after assigning a rider
    const { data: riders = [] ,refetch: parcelRefetch } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/riders?status=approved&district=${selectedParcel?.senderDistrict}`
            );
            return res.data;
        }
    });

    const handleAssignRider = rider => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderEmail: rider.email,
            riderName: rider.name,
            parcelId: selectedParcel._id,

        }
        axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close();
                    parcelRefetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Rider has been assigned .`,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
            })
    }

    const openAssignRiderModal = parcel => {
        setSelectedParcel(parcel)
        console.log('selectedParcel', parcel)
        riderModalRef.current.showModal();
    }

    return (
        <div>
            <h3 className='text-4xl text-secondary font-bold'>Assign Riders: {parcels.length}</h3>


            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
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
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>
                                    <button onClick={() => openAssignRiderModal(parcel)} className='btn btn-primary text-black'>Find Riders</button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Riders: {riders.length}!</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    riders.map((rider, i) => <tr key={rider._id}>
                                        <th>{i + 1}</th>
                                        <td>{rider.name}</td>
                                        <td>{rider.email}</td>
                                        <td>
                                            <button onClick={() => handleAssignRider(rider)} className='btn btn-primary text-black'>Assign</button>
                                        </td>
                                    </tr>)
                                }



                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AssignRiders;