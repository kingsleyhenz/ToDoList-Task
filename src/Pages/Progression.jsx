import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import SideBar from '../Component/SideBar';
import '../Stylesheets/Progression.css';
import withAuth from '../Component/withAuth';
import { 
  TbTrendingUp, 
  TbCircleCheck, 
  TbClockHour4, 
  TbAlertCircle,
  TbChartPie,
  TbCalendarEvent
} from 'react-icons/tb';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import BASE_URL from "../apiConfig";
import toast from 'react-hot-toast';

const Progression = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const currentYear = new Date().getFullYear();
  const [fromDate, setFromDate] = useState(`${currentYear}-01-01`);
  const [toDate, setToDate] = useState(`${currentYear}-12-31`);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cookie = new Cookies();
      const token = cookie.get("token");
      try {
        const queryFrom = `${fromDate}T00:00:00Z`;
        const queryTo = `${toDate}T23:59:59Z`;
        
        const res = await axios.get(`${BASE_URL}/task/progression?from=${queryFrom}&to=${queryTo}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Backend might wrap in standard { status, data: {...} } or return directly
        const payload = res.data.data ? res.data.data : res.data;
        setStats(payload);
        
      } catch (error) {
        toast.error("Failed to load progression analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fromDate, toDate]);

  const pieData = stats ? [
    { name: 'Completed', value: stats.percentages?.completed || 0, color: '#22c55e' },
    { name: 'Ongoing', value: stats.percentages?.ongoing || 0, color: '#f5a623' },
    { name: 'Incomplete', value: stats.percentages?.incomplete || 0, color: '#ef4444' }
  ].filter(d => d.value > 0) : [];

  const priorityData = stats ? [
    { name: 'High', count: stats.priorityBreakdown?.High || 0, fill: '#ef4444' },
    { name: 'Medium', count: stats.priorityBreakdown?.Medium || 0, fill: '#f5a623' },
    { name: 'Low', count: stats.priorityBreakdown?.Low || 0, fill: '#3b82f6' }
  ] : [];

  const totalTasks = stats ? (stats.totalCompleted + stats.totalPending + stats.totalIncomplete) : 0;

  return (
    <div className="progression-wrapper">
      <SideBar />
      <main className="progression-main fade-in">
         <header className="progression-header">
            <div className="header-text">
              <h1 className="page-title">
                <TbChartPie className="title-icon" style={{ color: '#09A5DB' }} />
                Task Progression
              </h1>
              <p className="page-subtitle">Track your delivery velocity and actionable insights</p>
            </div>
            
            <div className="date-filter-group slide-up">
               <div className="date-input-wrap">
                 <TbCalendarEvent className="date-icon" />
                 <input 
                   type="date" 
                   className="modern-date-input" 
                   value={fromDate} 
                   onChange={(e) => setFromDate(e.target.value)} 
                 />
                 <span className="date-label">From</span>
               </div>
               
               <span className="date-separator">➔</span>
               
               <div className="date-input-wrap">
                 <TbCalendarEvent className="date-icon" />
                 <input 
                   type="date" 
                   className="modern-date-input" 
                   value={toDate} 
                   onChange={(e) => setToDate(e.target.value)} 
                 />
                 <span className="date-label">To</span>
               </div>
            </div>
         </header>

         {loading ? (
            <div className="loader-container" style={{ position: 'relative', height: '300px' }}>
               <div className="modern-spinner"></div>
            </div>
         ) : (
            <>
               {/* KPI Row */}
               <div className="kpi-grid slide-up">
                  <div className="kpi-card">
                     <div className="kpi-icon-wrap" style={{ background: '#f0fdf4', color: '#22c55e' }}>
                       <TbCircleCheck />
                     </div>
                     <div className="kpi-details">
                        <span className="kpi-val">{stats?.totalCompleted || 0}</span>
                        <span className="kpi-label">Total Completed</span>
                     </div>
                  </div>
                  
                  <div className="kpi-card">
                     <div className="kpi-icon-wrap" style={{ background: '#fff7ed', color: '#f5a623' }}>
                       <TbClockHour4 />
                     </div>
                     <div className="kpi-details">
                        <span className="kpi-val">{stats?.totalPending || 0}</span>
                        <span className="kpi-label">Total Pending</span>
                     </div>
                  </div>

                  <div className="kpi-card">
                     <div className="kpi-icon-wrap" style={{ background: '#fef2f2', color: '#ef4444' }}>
                       <TbAlertCircle />
                     </div>
                     <div className="kpi-details">
                        <span className="kpi-val">{stats?.totalIncomplete || 0}</span>
                        <span className="kpi-label">Total Incomplete</span>
                     </div>
                  </div>

                  <div className="kpi-card">
                     <div className="kpi-icon-wrap" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                       <TbTrendingUp />
                     </div>
                     <div className="kpi-details">
                        <span className="kpi-val">{stats?.avgProgress || 0}%</span>
                        <span className="kpi-label">Avg. Progress</span>
                     </div>
                  </div>

               </div>

               {/* Charts Row */}
               <div className="charts-grid slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="chart-card">
                     <div className="chart-header">
                        <h3>Status Distribution</h3>
                        <p>Segmented task completion volume</p>
                     </div>
                     <div className="chart-body">
                        {pieData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={250}>
                             <PieChart>
                               <Pie
                                  data={pieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={65}
                                  outerRadius={90}
                                  paddingAngle={5}
                                  dataKey="value"
                               >
                                  {pieData.map((entry, index) => (
                                     <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                               </Pie>
                               <Tooltip 
                                  contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                               />
                               <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '0.85rem' }} />
                             </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="empty-chart">No data to display</div>
                        )}
                     </div>
                  </div>

                  <div className="chart-card">
                     <div className="chart-header">
                        <h3>Priority Breakdown</h3>
                        <p>Total assignments across priority bands</p>
                     </div>
                     <div className="chart-body">
                        {totalTasks > 0 ? (
                          <ResponsiveContainer width="100%" height={250}>
                             <BarChart data={priorityData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: '0.75rem', fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: '0.75rem', fill: '#64748b' }} allowDecimals={false} />
                                <Tooltip 
                                   cursor={{ fill: '#f8fafc' }}
                                   contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                                />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                   {priorityData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.fill} />
                                   ))}
                                </Bar>
                             </BarChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="empty-chart">No data to display</div>
                        )}
                     </div>
                  </div>
               </div>
            </>
         )}
      </main>
    </div>
  );
};

export default withAuth(Progression);
