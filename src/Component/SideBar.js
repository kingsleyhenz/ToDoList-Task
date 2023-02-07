import React from "react";
import {NavLink} from "react-router-dom"
import '../Stylesheets/Sidebar.css';


const SideBar =()=>{ 
    return(
        <div className="Bar">
            <div className="firstlayer">
            <NavLink to="/Home">Home</NavLink>
            <NavLink to="/Todo">Add Todo</NavLink>
            <NavLink to="/task">Tasks</NavLink>
            </div>
            <div className="secondlayer">
            <NavLink to="/Logout">Logout</NavLink>
            </div>
        </div>
    )
}


export default SideBar