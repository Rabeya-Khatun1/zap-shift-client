
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'
import { FaRegEye, FaTrashCan, FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from 'sweetalert2';
import { Link } from 'react-router';


const ApproveRiders = () => {


    const axiosSecure = useAxiosSecure();

    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders')
            return res.data;
        }
    })


const updateRiderStatus =(rider ,status)=> {

    const updateInfo = {status:status, email:rider.email}

axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
.then(res => {
    console.log(res.data)
    if(res.data.modifiedCount){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success', 
                    title:`Rider has been ${status}`,
                    showConfirmButton:false,
                    timer:1500,
                })
        
    }
})

}

const handleApporoval = (rider) =>{
   
updateRiderStatus(rider, 'approved')
 refetch();
//     const updateInfo = {status:'approved'}

// axiosSecure.patch(`/riders/${id}`, updateInfo)
// .then(res => {
//     if(res.data.modifiedCount){
//                 Swal.fire({
//                     position: 'top-end',
//                     icon: 'success', 
//                     title:'Rider has been Approved.',
//                     showConfirmButton:false,
//                     timer:1500,
//                 })
        
//     }
// })

}

const handleRejection = (rider)=>{

    updateRiderStatus(rider, 'rejected')

    refetch();
}
  
const handleDeleteRider = (id) =>{

axiosSecure.delete(`/riders/${id}`)
.then(res => {
    console.log('resdata', res.data)
    

Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
if(res.data.deletedCount){
refetch()
    }
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
    
})

}

return (
        <div>
            <h3 className='text-secondary text-5xl font-bold'>Riders Pending Approval: {riders.length}</h3>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>District</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) =>
                                <tr key={rider._id}>
                                    <th>{index + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{
                                        <p className={`${rider.status === 'approved' ? 'text-green-500' : 'text-red-500' }`  }>{rider.status}</p>
}</td>
                                    <td>{rider.district}</td>
                                    <td>

                                        <button 
                                        className='btn'><Link to={`/riders/${rider._id}`}><FaRegEye /></Link></button>
                                        <button onClick={()=>handleApporoval(rider)} className='btn'><FaUserCheck /></button>
                                        <button onClick={()=>handleRejection(rider)} className='btn'><IoPersonRemoveSharp /></button>
                                        <button onClick={()=> handleDeleteRider(rider._id)} className='btn'><FaTrashCan></FaTrashCan></button>
                                    </td>
                                </tr>
                            )
                        }



                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ApproveRiders;