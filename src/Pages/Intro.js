import React, { useState }  from 'react'
import {NavLink} from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2';
import '../Stylesheets/SignUp.css'
import img from '../images/sign.png'


const SignUp = ()=>{
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://kingsleystodolist.onrender.com/api/v1/task/register', {
        name,
        username,
        email,
      });
      Swal.fire({
        title: 'Success!',
        text: 'User has been registered successfully \n An otp has been sent to your email',
        icon: 'success',
        timer: 5000,
        timerProgressBar: true,
        onClose: () => {
          window.location.assign('/login');
        }
      });
      
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire({
          title: 'Error!',
          text: error.response.data.data,
          icon: 'error',
          timer: 5000,
          timerProgressBar: true
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'An unknown error occurred',
          icon: 'error',
          timer: 5000,
          timerProgressBar: true
        });
      }
    }
  }
    return(
        <>
        <div className='sign-wrp'>
          <div className='left'>
            <div className='left-txt'>
            <span>L'aville Task Management System</span>
            <p>The Ultimate Task Management System, an application suited to the Task of Handling Task😏</p>
            </div>
            <div className='left-img'>
              <img src={img} alt="" />
            </div>
          </div>
          <div className='right'>
            <div className='right-txt'>
                <span>Sign Up Now!</span>
                <p>Sign Up And Start Taking Advantage Of L'aville Task Management System</p>
              </div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type="text" id="username" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} required/>
                <input type="email" id="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                <button type='submit'>Sign Up Now</button> 
                <p>Already Have An Account? <NavLink to="/login">Log In</NavLink></p>
            </form> 
          </div>
        </div>
        </>
    )
}

export default SignUp