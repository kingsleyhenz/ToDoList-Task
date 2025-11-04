import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import SideBar from "../Component/SideBar.jsx";
import 'react-calendar/dist/Calendar.css';
import '../Stylesheets/Home.css'
import Cookies from "universal-cookie";
import { BallTriangle } from 'react-loader-spinner';
import withAuth from '../Component/withAuth';
import QouteCar from "../Component/carousel.jsx";
import { 
  TbChecklist,
  TbCalendarTime,
  TbBriefcase,
  TbCheckupList
} from "react-icons/tb";

const Home = () => {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cookie = new Cookies();
      const token = cookie.get("token");
      try {
        const response = await axios.get(
          "https://kingsleystodolist.onrender.com/api/v1/task/allTasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchData();
  }, []);


  // Get current time for dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="loader-content">
            <BallTriangle 
              type="Oval" 
              color="var(--primary-blue)" 
              height={60} 
              width={60} 
            />
            <p>Loading your workspace...</p>
          </div>
        </div>
      ) : (
        <div className="dashboard-wrapper">
          <SideBar />
          <main className="main-content">
            {/* Header Section */}
            <header className="dashboard-header">
              <div className="header-content">
                <div className="greeting-section">
                  <h1 className="greeting-title">
                    {getGreeting()}, Kingsley! 👋
                  </h1>
                  <p className="greeting-subtitle">
                    {getCurrentDate()} • Ready to be productive?
                  </p>
                </div>
                <div className="header-actions">
                  <button className="btn btn-secondary">
                    <span>Quick Add Task</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Dashboard Content */}
            <section className="dashboard-content">
              {/* Stats Overview */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon primary">
                    <TbChecklist />
                  </div>
                  <div className="stat-content">
                    <h3>24</h3>
                    <p>Total Tasks</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon success">
                    <TbCheckupList />
                  </div>
                  <div className="stat-content">
                    <h3>18</h3>
                    <p>Completed</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon warning">
                    <TbCalendarTime />
                  </div>
                  <div className="stat-content">
                    <h3>6</h3>
                    <p>In Progress</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon info">
                    <TbBriefcase />
                  </div>
                  <div className="stat-content">
                    <h3>12</h3>
                    <p>This Week</p>
                  </div>
                </div>
              </div>

              {/* Quote Carousel Section */}
              <div className="inspiration-section">
                <h2 className="section-title">Daily Inspiration</h2>
                <div className="quote-container">
                  <QouteCar />
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </>
  );
}

export default withAuth(Home);