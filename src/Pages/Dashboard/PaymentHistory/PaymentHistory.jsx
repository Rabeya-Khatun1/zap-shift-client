import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {

    const axiosSecure = useAxiosSecure();
const {user} = UseAuth();
const {data: payments = []} = useQuery({
    
    queryKey:['payments', user?.email],
    queryFn: async()=>{

 const res = await axiosSecure.get(`/payments?email=${user?.email}`)
return res.data

    }
})
console.log(payments)
    return (
        <div>
             <h1 className='text-5xl'>Payment history: {payments.length}</h1>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Amount</th>
        <th>Paid Time</th>
        <th>Transaction ID</th>
      </tr>
    </thead>
    <tbody>
           {
            payments.map((payment, index)=>       <tr key={payment._id}>
 
        <th>{index + 1}</th>
        <td>{payment.parcelName}</td>
        <td>{payment.amount}</td>
        <td>{payment.paidAt}</td>
        <td>{payment.transactionId}</td>
      </tr> )
        }

    </tbody>
  </table>
</div>
           
        </div>
    );
};

export default PaymentHistory;