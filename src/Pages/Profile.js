import React from 'react';
import SideBar from './../Component/SideBar';
import '../Stylesheets/profile.css'
import {RiMapPinUserFill} from 'react-icons/ri'


const Profile = () =>{
    return(
        <>
            <div className='wrapper'>
            <div className="head">
            <p>L'aville TMS</p>
          </div>
          <div className="body-wrp">
            <SideBar/>
            <div className='homebody'>
                <p>My Profile</p>
                <div className='probox'>
                <RiMapPinUserFill id='pro-i'/>
                <div className='det-wrp'>
                  <div className='def-det'>
                    <p>Name</p>
                    <p>Username</p>
                    <p>Email</p>
                    <p>Password</p>
                  </div>
                  <div className='chng-det'>
                    <div className='em-chng'>
                      <button>Request For Update Otp</button>
                    </div>
                    <div className='chng-bx'>
                      <input type="text" placeholder='New Name'/>
                      <input type="text" placeholder='New Username'/>
                      <input type="text" placeholder='New Email'/>
                      <input type="text" placeholder='New Password'/>
                      <input type="text" placeholder='Reset Otp'/>
                      <button>Update profile</button>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
            </div>
        </>
    )
}

export default Profile
