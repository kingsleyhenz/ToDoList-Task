import React, { useState }  from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast';
import '../Stylesheets/IntroProfessional.css'
import heroImg from '../images/hero-prof.png'
import BASE_URL from '../apiConfig';

const SignUp = ()=>{
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/user/register`, { 
        name,
        username,
        email
      });
      if (data.status === "success") {
        toast.success('Registration successful. Please check your email for OTP.');
        navigate('/create-password', { state: { email } });
      } else {
        toast.error(data.message || 'Action failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An unknown error occurred');
    }
  };

  return(
    <div className='intro-container'>
      {/* Visual Section */}
      <div className="intro-visual-side">
        <div className="visual-content">
          <div className="intro-brand">
            <div className="brand-dot">✓</div>
            <h1>TickIt</h1>
          </div>
          
          <div className="hero-text">
            <h2>Master your workflow with precision.</h2>
            <p>Experience a streamlined approach to task management. Built for professionals who value clarity, efficiency, and elegant simplicity.</p>
          </div>

          <div className="hero-image-container">
            <img src={heroImg} alt="Professional Dashboard" className="hero-img" />
          </div>

          <div className="feature-tags">
            <div className="tag">Cloud Sync</div>
            <div className="tag">Team Focus</div>
            <div className="tag">Encrypted</div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="intro-form-side">
        <div className="form-wrapper">
          <div className="form-header">
            <h3>Get Started</h3>
            <p>Join thousands of professionals organizing their life.</p>
          </div>

          <form onSubmit={handleSubmit} className="prof-form">
            <div className="input-block">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="prof-input"
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="prof-input"
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="email">Work Email</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="prof-input"
                required
              />
            </div>

            <button type='submit' className="submit-btn">
              Create My Account
            </button>

            <div className="form-footer">
              <p>Already have an account? <NavLink to="/login" className="login-link">Sign in</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp