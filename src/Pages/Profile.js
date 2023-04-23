import React from 'react';
import SideBar from './../Component/SideBar';
import '../Stylesheets/profile.css'


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
                    
                </div>
            </div>
          </div>
            </div>
        </>
    )
}

export default Profile
