import React, { useState }  from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2';
import '../Stylesheets/SignUpNew.css'
import img from '../images/sign.png'


const SignUp = ()=>{
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("https://kingsleystodolist.onrender.com/api/v1/task/user", { 
        name,
        username,
        email
      });
      if (data.status === "success") {
        console.log(data);
        Swal.fire({
          title: 'Success!',
          text: 'User created successfully',
          icon: 'success',
          timer: 10000,
          timerProgressBar: true,
        });
        navigate('/login');
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.data,
          icon: 'error',
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire({
          title: 'Error!',
          text: error.response.data.data,
          icon: 'error',
          timer: 5000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'An unknown error occurred',
          icon: 'error',
          timer: 5000,
          timerProgressBar: true,
        });
      }
    }
  };

  return(
    <div className='signup-page'>
      {/* Animated Background */}
      <div className="signup-bg">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-gradient"></div>
      </div>

      {/* Main Content */}
      <div className='signup-content'>
        {/* Header */}
        <div className="signup-header">
          <div className="signup-brand">
            <div className="brand-icon">
              <span>✓</span>
            </div>
            <h1>TickIt</h1>
          </div>
          <div className="signup-title">
            <h2>Join the Revolution</h2>
            <p>Transform your productivity with our powerful task management platform</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="signup-card">
          <div className="card-header">
            <h3>Create Your Account</h3>
            <p>Start your productivity journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-field">
              <div className="input-container">
                <input 
                  type="text" 
                  id="name" 
                  placeholder=" " 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="floating-input"
                  required
                />
                <label htmlFor="name" className="floating-label">Full Name</label>
                <div className="input-line"></div>
              </div>
            </div>

            <div className="input-field">
              <div className="input-container">
                <input 
                  type="text" 
                  id="username" 
                  placeholder=" " 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="floating-input"
                  required
                />
                <label htmlFor="username" className="floating-label">Username</label>
                <div className="input-line"></div>
              </div>
            </div>

            <div className="input-field">
              <div className="input-container">
                <input 
                  type="email" 
                  id="email" 
                  placeholder=" " 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="floating-input"
                  required
                />
                <label htmlFor="email" className="floating-label">Email Address</label>
                <div className="input-line"></div>
              </div>
            </div>

            <button type='submit' className="signup-btn">
              <span>Create Account</span>
              <div className="btn-shine"></div>
            </button>

            <div className="signup-footer">
              <p>Already have an account? <NavLink to="/login" className="login-redirect">Sign in here</NavLink></p>
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <span>Goal Tracking</span>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <span>Lightning Fast</span>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <span>Secure & Private</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp