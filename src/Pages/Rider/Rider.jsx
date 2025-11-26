
import { useForm, useWatch } from 'react-hook-form';
import UseAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {

const {
    register, 
    handleSubmit, 
    control, 
    // formState:{errors}
} = useForm();

const {user} = UseAuth();
const axiosSecure = useAxiosSecure();

const serviceCenters = useLoaderData();
const regionDuplicate = serviceCenters.map(c=> c.region);
const regions = [...new Set(regionDuplicate)]
// explore useMemo useCallback

const districtsByRegion = (region)=>{
    const regionDistricts = serviceCenters.filter(c=> c.region === region)
    const districts = regionDistricts.map(d=> d.district);
    return districts;
}

const riderRegion = useWatch({control, name:'region'})

const handleRiderApplication = (data)=>{

    const rider = {
         
    name: data.name,
    email: data.email,
    region: data.region,
    district: data.district,
    address: data.address,
    license: data.license,
    nid: data.nid,
    bike: data.bike,
    phoneNumber: data.YourPhoneNumbr
  
    }

axiosSecure.post('/riders', rider)
.then(res => {
    if(res.data.insertedId){

        Swal.fire({
            position: 'top-end',
            icon: 'success', 
            title:'Your application has been submited. We will reach to you in 145 days ',
            showConfirmButton:false,
            timer:1500,
        })

    }
    
})


}

    return (
        <div>
           
            <h3 className='text-4xl m-2 text-secondary'>Be a Rider</h3>
        
        
         <form onSubmit={handleSubmit(handleRiderApplication)} className='mt-12 p-4 text-black'>

                {/* parcel type */}
         
                {/* parcel info: name, weight  */}
            
                {/* two column  */}



                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {/* Your info  */}

                    <fieldset className="fieldset">
                        <h4 className='text-2xl font-semibold'>Rider Details</h4>
                        {/* Your name  */}
                        <label className="label">Rider Name</label>
                        <input type="text" className="input w-full" {...register('name')} 
                        defaultValue={user?.displayName}
                        placeholder="Rider Name" />
                        {/* Your email  */}
                        <label className="label">Rider Email</label>
                        <input type="email" className="input w-full" {...register('email')} 
                        defaultValue={user?.email}
                        placeholder="Rider Email" />

                        {/* Your region  */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Regions</legend>
                            <select {...register('region')} defaultValue="Pick a Region" className="select w-full">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((r, index) => <option key={index}>{r}</option>)
                                }

                            </select>
                        </fieldset>

                        {/* sender districts  */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend"> Districts</legend>
                            <select {...register('district')} defaultValue="Pick a Districts" className="select w-full">
                                <option disabled={true}>Pick a Districts</option>
                                {
                                    districtsByRegion(riderRegion).map((r, index) => <option key={index}>{r}</option>)
                                }

                            </select>
                        </fieldset>

                        {/* your address  */}
                        <label className="label mt-4">Your Address</label>
                        <input type="text" className="input w-full" {...register('address')} placeholder="Your Address" />
                       

                
                    </fieldset>

                    {/* reciever info  */}

                    <div>
                        <fieldset className="fieldset">
                            <h4 className='text-2xl font-semibold'>More Details</h4>
                            {/*reciever name  */}
                            <label className="label">Driving License</label>
                            <input type="text" className="input w-full" {...register('license')} placeholder="Driving License" />
                            {/* reciever email  */}
                            <label className="label">NID</label>
                            <input type="text" className="input w-full" {...register('nid')} placeholder="NID" />
                            {/* reciever address  */}
                            <label className="label mt-4">Bike</label>
                            <input type="text" className="input w-full" {...register('bike')} placeholder="Bike" />
                            {/* reciever phone number  */}
                            <label className="label mt-4">Your Phone Number</label>
                            <input type="number" className="input w-full" {...register('YourPhoneNumbr')} placeholder="Your Phone Number" />



                        </fieldset>
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-black mt-5 text-center w-full' value="Apply as a rider" />
            </form>
        
        </div>
    );
};

export default Rider;