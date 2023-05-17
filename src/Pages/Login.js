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
    <div className='sign-wrp'>
          <div className='left'>
            <div className='left-txt'>
            <span>L'aville Task Management System</span>
            <p></p>
            </div>
            <div className='left-img'>
              <img src={img} alt="" />
            </div>
          </div>
          <div className='right'>
            <div className='right-txt'>
                <span>Login Now!</span>
                <p>Hurry And Get Stared With L'aville Task Management System😆</p>
              </div>
      <form onSubmit={handleSubmit} id="log">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password}onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit">Login</button>
        <p>Don't Have An Account Yet?😥 <NavLink to="/">Sign Up</NavLink></p>
      </form> 
          </div>
        </div>
  );
};

export default Login;

 