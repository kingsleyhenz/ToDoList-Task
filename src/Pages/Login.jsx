import React, { useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import Cookies from 'universal-cookie';
import { NavLink } from "react-router-dom";
import '../Stylesheets/LoginProfessional.css'
import loginHero from '../images/login-prof.png'
import BASE_URL from "../apiConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/user/login`, { 
        email,
        password,
      });
      if (data.status === "success") {
        toast.success('Welcome Back! Login successful');
        cookies.set("token", data.data.token, { path: "/" });
        window.location.assign("/dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='login-prof-container'>
      {/* Form Section */}
      <div className="login-form-side">
        <div className="login-form-wrapper">
          <div className="login-form-header">
            <h3>Sign In</h3>
            <p>Enter your credentials to access your secure workspace.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-prof-form">
            <div className="input-block">
              <label htmlFor="email">Work Email</label>
              <input 
                id="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="prof-input"
                required
              />
            </div>
            
            <div className="input-block">
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="prof-input"
                required
              />
            </div>
            
            <button type="submit" className="login-submit-btn">
              Authenticate
            </button>
            
            <div className="login-form-footer">
              <p>New to TickIt? <NavLink to="/" className="signup-link">Create an account</NavLink></p>
            </div>
          </form>
        </div>
      </div>

      {/* Visual Section */}
      <div className="login-visual-side">
        <div className="login-visual-content">
          <div className="login-brand">
            <div className="brand-square">✓</div>
            <h1>TickIt</h1>
          </div>
          
          <div className="login-hero-text">
            <h2>Secure. Reliable. Professional.</h2>
          </div>

          <div className="login-hero-img-container">
            <img src={loginHero} alt="Secure Authentication" className="login-hero-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

 