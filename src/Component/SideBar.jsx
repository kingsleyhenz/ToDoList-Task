import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../Stylesheets/Sidebar.css';
import Cookies from 'universal-cookie';
import toast from "react-hot-toast";
import { 
  TbLayoutDashboard,
  TbChecklist,
  TbCalendarEvent,
  TbSettings,
  TbLogout,
  TbDiamond
} from "react-icons/tb";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove('token');
    toast.success('Logged Out Successfully');
    navigate('/login');
  };

  const navItems = [
    { icon: TbLayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: TbChecklist, label: 'Add Todo', path: '/todo' },
    { icon: TbCalendarEvent, label: 'All Tasks', path: '/task' },
    { icon: TbDiamond, label: 'Premium', path: '/subscription', badge: 'PRO' },
  ];


  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">T</div>
          <div className="logo-text">
            <h2>TickIt</h2>
            <span>PRO COMMAND</span>
          </div>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">KH</div>
          <div className="user-info">
            <h4>Kingsley Henz</h4>
            <span>Administrator</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">Menu</h3>
          <ul className="nav-menu">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <NavLink to={item.path} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                  <item.icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

      </nav>

      <div className="sidebar-footer">
        <NavLink to="/profile" className="nav-link">
          <TbSettings className="nav-icon" />
          <span className="nav-label">Settings</span>
        </NavLink>
        <button className="logout-btn" onClick={handleLogout}>
          <TbLogout className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
