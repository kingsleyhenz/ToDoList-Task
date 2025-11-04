import React, { useState, useEffect } from 'react';
import SideBar from './../Component/SideBar';
import Swal from 'sweetalert2';
import { TbUser, TbMail, TbEdit, TbLock, TbUserCircle } from 'react-icons/tb';
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
          title: 'Profile Updated!',
          text: data.message,
          icon: 'success',
          timer: 5000,
          timerProgressBar: true,
          background: '#ffffff',
          color: '#1e293b',
          iconColor: '#3b82f6',
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
          <div className="loader-content">
            <BallTriangle type="Oval" color="#3b82f6" height={60} width={60} />
            <p>Loading your profile...</p>
          </div>
        </div>
      ) : (
        <div className="profile-wrapper">
          <SideBar />
          <main className="profile-main">
            <div className="profile-header">
              <div className="header-content">
                <h1 className="page-title">
                  <TbUserCircle className="title-icon" />
                  My Profile
                </h1>
                <p className="page-subtitle">Manage your account settings and preferences</p>
              </div>
            </div>

            <div className="profile-content">
              <div className="profile-grid">
                {/* Profile Overview Card */}
                <div className="profile-card">
                  <div className="profile-avatar">
                    <TbUser className="avatar-icon" />
                  </div>
                  <div className="profile-info">
                    <h2 className="profile-name">{userData?.name || 'User Name'}</h2>
                    <p className="profile-username">@{userData?.username || 'username'}</p>
                  </div>
                  <div className="profile-stats">
                    <div className="stat-item">
                      <span className="stat-number">24</span>
                      <span className="stat-label">Total Tasks</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">18</span>
                      <span className="stat-label">Completed</span>
                    </div>
                  </div>
                </div>

                {/* Current Information Card */}
                <div className="info-card">
                  <div className="card-header">
                    <h3>Account Information</h3>
                  </div>
                  <div className="info-list">
                    <div className="info-item">
                      <TbUser className="info-icon" />
                      <div className="info-details">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{userData?.name || 'Not set'}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <TbUser className="info-icon" />
                      <div className="info-details">
                        <span className="info-label">Username</span>
                        <span className="info-value">{userData?.username || 'Not set'}</span>
                      </div>
                    </div>
                    <div className="info-item">
                      <TbMail className="info-icon" />
                      <div className="info-details">
                        <span className="info-label">Email Address</span>
                        <span className="info-value">{userData?.email || 'Not set'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Update Profile Card */}
                <div className="update-card">
                  <div className="card-header">
                    <h3>
                      <TbEdit className="card-icon" />
                      Update Profile
                    </h3>
                    <p>Change your account information and password</p>
                  </div>
                  
                  <form className="update-form" onSubmit={(e) => {e.preventDefault(); handleUpdate(e);}}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">
                          <TbUser className="label-icon" />
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          id="name"
                          placeholder="Enter your full name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)}
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="username">
                          <TbUser className="label-icon" />
                          Username
                        </label>
                        <input 
                          type="text" 
                          id="username"
                          placeholder="Enter your username" 
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="oldPassword">
                          <TbLock className="label-icon" />
                          Current Password
                        </label>
                        <input 
                          type="password" 
                          id="oldPassword"
                          placeholder="Enter current password" 
                          value={oldPassword} 
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="newPassword">
                          <TbLock className="label-icon" />
                          New Password
                        </label>
                        <input 
                          type="password" 
                          id="newPassword"
                          placeholder="Enter new password" 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        <TbEdit className="btn-icon" />
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default withAuth(Profile);
