import React, { useState, useEffect } from 'react';
import SideBar from './../Component/SideBar';
import Swal from 'sweetalert2';
import { RiMapPinUserFill } from 'react-icons/ri';
import axios from 'axios';
import '../Stylesheets/profile.css'
import Cookies from 'universal-cookie';
import withAuth from '../Component/withAuth';
import {BallTriangle} from 'react-loader-spinner';

const Profile = () => {
  const [loading, setloading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const cookie = new Cookies();
      const token = cookie.get('token');
      try {
        const response = await axios.get('https://kingsleystodolist.onrender.com/api/v1/task/getUser',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const cookie = new Cookies();
      const token = cookie.get('token');
    try {
      const { data } = await axios.patch('https://kingsleystodolist.onrender.com/api/v1/task/updateUser', {
        // const { data } = await axios.patch('http://localhost:10000/api/v1/task/updateUser', {
        name,
        username,
        oldPassword,
        newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Replace "yourAccessToken" with the actual access token
        }
      });

      if (data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: data.message,
          icon: 'success',
          timer: 5000,
          timerProgressBar: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error'
      });
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setloading(false);
    }, 1000); // Set isLoading to false after 5 seconds
    return () => clearTimeout(timerId);
  }, []);

  return (
    <>
     {loading ? (
        <div className="loader-container">
          <BallTriangle type="Oval" color="orangered" height={80} width={80} />
        </div>
      ) : (
    <div className="wrapper">
      <div className="head">
        <p>L'aville TMS</p>
      </div>
      <div className="body-wrp">
        <SideBar />
        <div className="homebody">
          <p>My Profile</p>
          <div className="probox">
            <RiMapPinUserFill id="pro-i" />
            <div className="det-wrp">
              <div className="def-det">
                <p>Name: {userData?.name}</p>
                <p>Username: {userData?.username}</p>
                <p>Email: {userData?.email}</p>
              </div>
              <div className="chng-bx">
                <input type="text" placeholder="Edit Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Edit Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button onClick={handleUpdate}>Update profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default withAuth(Profile);
