import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../Stylesheets/Sidebar.css';
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaTasks } from "react-icons/fa";
import { BiNotepad } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import Cookies from 'universal-cookie';
import Swal from "sweetalert2"

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from cookies or localStorage
    const cookies = new Cookies();
    cookies.remove('token');
    Swal.fire({
        title: 'Success!',
        text: 'Logged Out Successfully',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
      });
  };

  return (
    <div className="Bar">
      <div className="firstlayer">
        <NavLink to="/Home">
          <p id="txtlnk">Home</p>
          <AiOutlineHome id="ilnx" />
        </NavLink>
        <NavLink to="/Todo">
          <p id="txtlnk">Add Todo</p>
          <FaTasks id="ilnx" />
        </NavLink>
        <NavLink to="/task">
          <p id="txtlnk">Tasks</p>
          <BiNotepad id="ilnx" />
        </NavLink>
        <NavLink to="/profile">
          <p id="txtlnk">My Profile</p>
          <CgProfile id="ilnx" />
        </NavLink>
      </div>
      <div className="secondlayer">
        <NavLink to="/login" onClick={handleLogout}>
          <p id="txtlnk">Logout</p>
          <HiOutlineLogout id="ilnx" />
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
