import React, { useState, useEffect } from 'react';
import SideBar from './../Component/SideBar';
import toast from 'react-hot-toast';
import { TbUser, TbMail, TbEdit, TbLock, TbUserCircle, TbShieldCheck } from 'react-icons/tb';
import axios from 'axios';
import '../Stylesheets/profile.css';
import Cookies from 'universal-cookie';
import withAuth from '../Component/withAuth';
import { BallTriangle } from 'react-loader-spinner';
import BASE_URL from '../apiConfig';

const Profile = () => {
  const [loading, setLoading] = useState(true);
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
        const { data } = await axios.get(`${BASE_URL}/getUser`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(data.data);
        setName(data.data.name);
        setUsername(data.data.username);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const cookie = new Cookies();
    const token = cookie.get('token');
    try {
      const { data } = await axios.patch(`${BASE_URL}/updateUser`, {
        name,
        username,
        oldPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.status === 'success') {
        toast.success('Account updated successfully');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(data.message || 'Action failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="modern-spinner"></div>
        </div>
      ) : (
        <div className="profile-wrapper">
          <SideBar />
          <main className="profile-main">
            <header className="profile-header">
              <h1 className="page-title">
                <TbUserCircle className="title-icon" />
                Account Settings
              </h1>
              <p className="page-subtitle">Personalize your identity and secure your account</p>
            </header>

            <div className="profile-grid">
              <aside className="profile-aside">
                <div className="profile-card-minimal">
                  <div className="profile-avatar-large">
                    {userData?.name?.charAt(0) || 'U'}
                  </div>
                  <h2 className="profile-name-big">{userData?.name || 'User Name'}</h2>
                   <p className="profile-user-tag">@{userData?.username || 'username'}</p>
                   <div className="profile-stats-mini">
                     <div className="stat-box">
                       <span>{userData?.totalTasks || 0}</span>
                       <span>Tasks</span>
                     </div>
                     <div className="stat-box">
                       <span>{userData?.completedTasks || 0}</span>
                       <span>Status</span>
                     </div>
                   </div>
                </div>

                <div className="account-info-list" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
                   <div className="info-box-item">
                     <label>Email Address</label>
                     <p>{userData?.email || 'not set'}</p>
                   </div>
                   <div className="info-box-item">
                     <label>Verification</label>
                     <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#22c55e' }}>
                       <TbShieldCheck /> Verified Account
                     </p>
                   </div>
                </div>
              </aside>

              <div className="update-section">
                <div className="section-head">
                  <h3>
                    <TbEdit /> Update Profile
                  </h3>
                  <p>Keep your account information current and secure</p>
                </div>
                
                <form className="update-form" onSubmit={handleUpdate}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input 
                        type="text" 
                        id="username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                    <div className="form-group">
                      <label htmlFor="oldPassword">Current Password</label>
                      <input 
                        type="password" 
                        id="oldPassword"
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input 
                        type="password" 
                        id="newPassword"
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-actions" style={{ marginTop: '2rem' }}>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default withAuth(Profile);
