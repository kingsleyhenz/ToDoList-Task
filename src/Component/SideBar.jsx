import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../Stylesheets/Sidebar.css';
import Cookies from 'universal-cookie';
import Swal from "sweetalert2";
import { 
  TbGridDots,
  TbChecklist,
  TbCalendarTime,
  TbBriefcase,
  TbUser,
  TbCheckupList,
  TbLogout,
  TbSettings,
  TbHome
} from "react-icons/tb";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove('token');
    Swal.fire({
      title: 'Logged Out Successfully',
      text: 'You have been securely logged out.',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      background: 'var(--white)',
      color: 'var(--gray-800)',
      iconColor: 'var(--primary-blue)',
    }).then(() => {
      navigate('/login');
    });
  };

  const menuItems = [
    { icon: TbHome, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: TbChecklist, label: 'All Tasks', path: '/todo', badge: '12' },
    { icon: TbCalendarTime, label: 'Today', path: '/task', badge: '3' },
    { icon: TbCheckupList, label: 'Completed', path: '/dashboard', badge: null },
    { icon: TbBriefcase, label: 'Work', path: '/dashboard', badge: '5' },
    { icon: TbUser, label: 'Personal', path: '/dashboard', badge: '7' },
  ];

  return (
    <div className="sidebar">
      {/* Header Section */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <TbGridDots />
          </div>
          <div className="logo-text">
            <h2>TickIt</h2>
            <span>Task Manager</span>
          </div>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">
            <TbUser />
          </div>
          <div className="user-info">
            <h4>Kingsley Henshaw</h4>
            <span>Premium User</span>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">My Workspace</h3>
          <ul className="nav-menu">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  <item.icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer Section */}
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
