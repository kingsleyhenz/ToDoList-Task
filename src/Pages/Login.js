import React from "react";
import axios from 'axios'
import Swal from "sweetalert2";
import { useState } from 'react'
import '../Stylesheets/SignUp.css'
import Cookies from 'universal-cookie';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://kingsleystodolist.onrender.com/api/v1/task/login", { 
        email,
        password 
      });
      if (data.status === "success") {
        Swal.fire({
          title: "Success!",
          text: "You are now logged in!",
          icon: "success",
        });
        window.location.assign("/Home");
        cookies.set("token", data.token, { path: "/" });
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
    <div className="wrapper">
      <form onSubmit={handleSubmit} id="log">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password}onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;