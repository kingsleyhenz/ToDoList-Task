import React from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import { useState } from 'react'
import '../Stylesheets/SignUp.css'
import Cookies from 'universal-cookie';
import img from '../images/sign.png'
import { NavLink } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://kingsleystodolist.onrender.com/api/v1/task/login", { 
        email,
        password,
      });
      if (data.status === "success") {
        console.log(data);
        Swal.fire({
          title: "Success!",
          text: "You are now logged in!",
          icon: "success",
          timer: 10000,
          timerProgressBar: true
        });
        cookies.set("token", data.data.token, { path: "/" });
        window.location.assign("/Home");

      } else {
        Swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };
  

  return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <div className='login-left'>
          <div className='brand-section'>
            <div className='brand-logo'>
              <div className='logo-icon'>
                <span>✓</span>
              </div>
              <h2>TickIt</h2>
            </div>
            <div className='brand-text'>
              <h1>Welcome Back</h1>
              <p>Sign in to your account and continue your productivity journey</p>
            </div>
          </div>
          <div className='login-illustration'>
            <img src={img} alt="Login illustration" />
          </div>
        </div>
        
        <div className='login-right'>
          <div className='login-form-wrapper'>
            <div className='login-header'>
              <h2>Sign In</h2>
              <p>Enter your credentials to access your workspace</p>
            </div>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  id="password"
                  type="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="form-input"
                  required
                />
              </div>
              
              <button type="submit" className="login-btn">
                Sign In
              </button>
              
              <div className="form-footer">
                <p>Don't have an account? <NavLink to="/" className="signup-link">Sign up here</NavLink></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

 