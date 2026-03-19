import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../Component/SideBar.jsx";
import { BallTriangle } from 'react-loader-spinner';
import withAuth from '../Component/withAuth';
import QouteCar from "../Component/carousel.jsx";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { 
  TbChecklist,
  TbCalendarTime,
  TbBriefcase,
  TbCheckupList,
  TbPlus
} from "react-icons/tb";
import BASE_URL from "../apiConfig";
import Cookies from "universal-cookie";
import '../Stylesheets/Home.css'

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const dummyChartData = [
  { month: "Jan", completed: 12 },
  { month: "Feb", completed: 15 },
  { month: "Mar", completed: 8 },
  { month: "Apr", completed: 22 },
  { month: "May", completed: 18 },
  { month: "Jun", completed: 25 },
  { month: "Jul", completed: 30 },
  { month: "Aug", completed: 21 },
  { month: "Sep", completed: 28 },
  { month: "Oct", completed: 35 },
  { month: "Nov", completed: 42 },
  { month: "Dec", completed: 50 }
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    summary: { totalTasks: 0, completed: 0, incomplete: 0, completedThisMonth: 0 },
    chartData: dummyChartData
  });

  useEffect(() => {
    const fetchStats = async () => {
      const cookies = new Cookies();
      const token = cookies.get('token');
      try {
        const currentYear = new Date().getFullYear();
        const { data } = await axios.get(`${BASE_URL}/task/stats?year=${currentYear}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (data.status === "success") {
          setStats((prev) => ({
            ...prev,
            summary: data.data.summary
          }));
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
           <div className="modern-spinner"></div>
        </div>
      ) : (
        <div className="dashboard-wrapper">
          <SideBar />
          <main className="main-content">
            <header className="dashboard-header">
              <div className="header-text">
                <h1 className="greeting-title">{getGreeting()}, User!</h1>
                <p className="greeting-subtitle">{getCurrentDate()}</p>
              </div>
              <button className="btn-add-task">
                <TbPlus style={{ marginRight: '8px' }} />
                New Task
              </button>
            </header>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                   <TbChecklist className="stat-icon" />
                   <span className="stat-label">Total Tasks</span>
                </div>
                <div className="stat-value">{stats.summary.totalTasks}</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                   <TbCheckupList className="stat-icon" />
                   <span className="stat-label">Completed</span>
                </div>
                <div className="stat-value">{stats.summary.completed}</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                   <TbCalendarTime className="stat-icon" />
                   <span className="stat-label">In Progress</span>
                </div>
                <div className="stat-value">{stats.summary.incomplete}</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                   <TbBriefcase className="stat-icon" />
                   <span className="stat-label">This Month</span>
                </div>
                <div className="stat-value">{stats.summary.completedThisMonth}</div>
              </div>
            </div>

            <div className="home-content-row">
              <div className="chart-card-wrapper">
                <div className="chart-card">
                  <div className="chart-header">
                    <h3>Performance Trends</h3>
                    <p>Monthly task completion breakdown</p>
                  </div>
                  <div className="chart-container" style={{ width: '100%', height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                          itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="completed" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="calendar-card-wrapper">
                <div className="calendar-card">
                  <div className="calendar-header">
                    <h3>My Calendar</h3>
                    <p>Today is {getCurrentDate()}</p>
                  </div>
                  <Calendar className="modern-calendar" />
                </div>
              </div>
            </div>

            <div className="inspiration-card">
               <div className="quote-content">
                  <QouteCar />
               </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default withAuth(Home);