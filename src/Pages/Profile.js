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
                <div className='det-wrp'></div>
                </div>
            </div>
          </div>
            </div>
        </>
    )
}

export default Profile
