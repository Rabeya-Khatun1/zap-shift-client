import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUserShield, FaUserTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UsersManagement = () => {

    const axiosSecure = useAxiosSecure();
const {data:users=[], refetch}= useQuery({
    queryKey: ['users',]
    ,
    queryFn: async ()=>{
       const res = await axiosSecure.get('/users')
   return res.data
    }
})

const handleMakeUser = user=>{
    const roleInfo = {role: 'admin'}
    axiosSecure.patch(`/users/${user._id}`,roleInfo)
    .then(res => {
        console.log(res.data)
        if(res.data.modifiedCount){
            refetch()
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success', 
                                title:`${users.displayName} marked as admin`,
                                showConfirmButton:false,
                                timer:1500,
                            })
        }
    })
    

}

const handleRemoveAdmin = user => {
    const roleInfo = {role: 'user'};

//TODO: must ask for confirmation before proceed 

Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
})
    axiosSecure.patch(`/users/${user._id}`, roleInfo)
    .then( res => {
        if(res.data.modifiedCount){
            Swal.fire({
                                position: 'top-end',
                                icon: 'success', 
                                title:`${users.displayName} remove from admin`,
                                showConfirmButton:false,
                                timer:1500,
                            })
        }
    })
}

    return (
        <div>
            <h3 className='text-4xl font-bold'>  Manage Users:{users.length}</h3>
       
       
       <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
   #
        </th>
        <th>User</th>
        <th>Email</th>
        <th>Role</th>
        <th>Admin Actions</th>
        <th>Others Actions</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
{
    users.map((user, index) => 
    <tr key={user._id}>
        <td>
{index +1}
        </td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.photoURL}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.displayName}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
   {user.email}
        </td>
        <td>
   {user.role}
        </td>
        <td>
            {
                user.role === 'admin' ?             
            <button
            onClick={()=>handleRemoveAdmin(user)} className='btn bg-red-400'>
                <FaUserTimes />
            </button>: 
            <button
            onClick={()=>handleMakeUser(user)} className='btn bg-green-400'>
                <FaUserShield></FaUserShield>
            </button>             
            }


        </td>
        <th>
          <button className="btn btn-ghost btn-xs">Actions</button>
        </th>
      </tr>
   
    )
}

  
   
    </tbody>

  </table>
</div>
       
        </div>
    );
};

export default UsersManagement;