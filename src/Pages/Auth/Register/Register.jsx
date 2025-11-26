import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocailLogin/SocialLogin';
import UseAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser,updateUserProfile } = UseAuth();
const location = useLocation();
const axiosSecure = useAxiosSecure();
const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
      const photoImg = data.photo[0];
      console.log("selected photo:", photoImg);

      // Step 1: Register user
      const result = await registerUser(data.email, data.password);
      console.log("User created:", result.user);

      // Step 2: Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", photoImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
      axios.post(image_API_URL, formData)
      .then( (result) => {
        const photoURL = result.data.data.url
// create user in the database

const userInfo = {
  email:data.email,
  displayName:data.name,
  photoURL:photoURL
}

axiosSecure.post('/users',userInfo)
.then(res => {
  if(res.data.insertedId){
    console.log('user inserted in server')
  }
})


        // update user profile to firebase 
const userProfile = {
displayName:data.name,
photoURL:photoURL
}

updateUserProfile(userProfile)
.then(result=>{
  console.log('user update done',result)
navigate(location?.state || '/')


})
.catch(error => {
  console.log(error)
})

    // Step 3: Final profile update (if you have updateProfile)
      // await updateUserProfile(result.user, data.name, photoURL);

         console.log("Registration complete!")
      })


  
     

    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="p-6 rounded-xl shadow-md w-[330px]">

        <form onSubmit={handleSubmit(handleRegistration)}>
          <h3 className="text-2xl text-center font-bold mb-2">Create an Account</h3>
          <p className="text-center mb-4">Fill the form to register</p>

          <fieldset className="fieldset">

            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-400 text-sm">Name is required.</p>}

            {/* Photo Upload */}
            <label className="label mt-3">Photo</label>
            <input
              type="file"
              
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && <p className="text-red-400 text-sm">Photo is required.</p>}

            {/* Email */}
            <label className="label mt-3">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-400 text-sm">Email is required.</p>}

            {/* Password */}
            <label className="label mt-3">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
              })}
              className="input"
              placeholder="Password"
            />

            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">Password must be 6+ characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm">
                Must contain 8+ chars, 1 uppercase, 1 lowercase, 1 number
              </p>
            )}

            <button className="btn btn-neutral mt-4 w-full">Register</button>
          </fieldset>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link className="text-blue-500 underline" to="/login">
            Login
          </Link>
        </p>

        <div className="mt-4">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
