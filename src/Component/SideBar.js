import React from "react";
import {NavLink} from "react-router-dom"
import '../Stylesheets/Sidebar.css';
import {AiOutlineHome} from "react-icons/ai"
import {CgProfile} from "react-icons/cg"
import {FaTasks} from "react-icons/fa"
import {BiNotepad} from "react-icons/bi"
import {HiOutlineLogout} from "react-icons/hi"

const SideBar =()=>{ 
    return(
        <div className="Bar">
            <div className="firstlayer">
            <NavLink to="/Home">
                <p id="txtlnk">Home</p>
                <AiOutlineHome id="ilnx"/>
            </NavLink>
            <NavLink to="/Todo">
                <p id="txtlnk">Add Todo</p>
                <FaTasks id="ilnx"/>
            </NavLink>
            <NavLink to="/task">
                <p id="txtlnk">Tasks</p>
                <BiNotepad id="ilnx"/>
            </NavLink>
            <NavLink to="/profile">
                <p id="txtlnk">My Profile</p>
                <CgProfile id="ilnx"/>
            </NavLink>
            </div>
            <div className="secondlayer">
            <NavLink to="/Logout">
                <p id="txtlnk">Logout</p>
                <HiOutlineLogout id="ilnx"/>
            </NavLink>
            </div>
        </div>
    )
}


export default SideBar