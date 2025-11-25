import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
const axiosSecure = useAxiosSecure();

const [searchParams] = useSearchParams();
const sessionId = searchParams.get('session_id')
console.log(sessionId)
const [paymentInfo, setPaymentInfo] = useState({});

useEffect( ()=>{
    if(sessionId){

axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
.then(res => {
    console.log(res.data)
setPaymentInfo({
    transactionId:res.data?.transactionId,
    trackingId:res.data?.trackingId
})

})

    }
},[sessionId, axiosSecure])

    return (
        <div>
            <h3 className='text-4xl text-center font-bold'>Payment Successfull</h3>
        
    <p>Your Trangsaction ID: {paymentInfo.transactionId}</p>
    <p>Your Parcel Tracking ID: {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;