import React from "react";
import {Route,Routes} from 'react-router-dom'
import Home from "../Pages/Home";
import todo from "../Pages/Todo";
import '../Stylesheets/Sidebar.css';


const sideBar =()=>{
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todo' element={<todo />} />
  </Routes>
    return(
        <div className="Bar">
            <div className="firstlayer">
                <a href="/Home">Home</a>
                <a href="/todo">ToDo List</a>
                <a href="">Notifications</a>
                <a href="">Categories</a>
            </div>
            <div className="secondlayer">
                <a href="">Settings</a>
                <a href="">Logout</a>
            </div>
        </div>
    )
}


export default sideBar