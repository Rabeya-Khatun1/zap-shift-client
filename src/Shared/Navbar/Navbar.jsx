import React from 'react';
import Logo from '../../Components/Logo/Logo';
import { Link } from 'react-router';
import useAuth from '../../Hooks/useAuth'

const Navbar = () => {

const {user,logOut} = useAuth()

const links = (
  <>
    <li><Link>Service</Link></li>
    <li><Link>Career</Link></li>
    <li><Link to='/coverage'>Coverage</Link></li>
    <li><Link to='/send-parcel'>Send Parcel</Link></li>
    <li><Link to='/rider'>Be a Rider</Link></li>

    {user && (
      <>
      <li><Link to='my-parcels'>My Parcels</Link></li>
      <li><Link to='/dashboard'>Dashboard</Link></li></>
    )}
  </>
)



 
const handleLogOut = ()=>{
  logOut()
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
}

    return (
<div className="navbar bg-base-100 shadow-sm pt-2 rounded-b-2xl">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
{links}
      </ul>
    </div>
<Logo></Logo>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
{links}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user ? <a onClick={handleLogOut} className="btn">Log Out</a> : <a className="btn"><Link to='/login'>Login</Link></a>
    } 
    <Link className='btn btn-primary mx-4 text-black' to='/rider'>Be a Rider</Link>
  </div>
</div>
    );
};

export default Navbar;