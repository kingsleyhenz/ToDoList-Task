import React from 'react';
import SideBar from './../Component/SideBar';
import '../Stylesheets/profile.css'
import {RiMapPinUserFill} from 'react-icons/ri'
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Profile = () =>{
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      const cookie = new Cookies();
      const token = cookie.get("token");
      try {
        const response = await axios.get('https://kingsleystodolist.onrender.com/api/v1/task/getUser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, []);


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
                  <p>Name: {userData?.name}</p>
                  <p>Username: {userData?.username}</p>
                  <p>Email: {userData?.email}</p>
                  </div>
                    <div className='chng-bx'>
                      <input type="text" placeholder='Edit Name'/>
                      <input type="text" placeholder='Edit Username'/>
                      {/* <input type="text" placeholder='Edit Email'/> */}
                      <input type="text" placeholder='Old Password'/>
                      <input type="text" placeholder='New Password'/>
                      <button>Update profile</button>
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
