import React, { useState }  from 'react'
import {NavLink} from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2';
import '../Stylesheets/SignUp.css'


const SignUp = ()=>{
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://kingsleystodolist.onrender.com/api/v1/task/register', {
        name,
        username,
        email,
        password,
      });
      if (response.data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: 'User has been registered successfully',
          icon: 'success'
        });
        window.location.assign('/login');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire({
          title: 'Error!',
          text: error.response.data.data,
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'An unknown error occurred',
          icon: 'error'
        });
      }
    }
  }
    return(
        <>
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h3>Input Your Details</h3>
                <input type="text" id="name" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type="text" id="username" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} required/>
                <input type="email" id="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                <input type="text" id="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                <button type='submit'>Sign Up Now</button> 
                <p>Already Have An Account? <NavLink to="/login">Log In</NavLink></p>
            </form> 
        </div>
        </>
    )
}

export default SignUp