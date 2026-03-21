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
  TbChartPie
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
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cookie = new Cookies();
      const token = cookie.get("token");
      try {
        const { data } = await axios.get(`${BASE_URL}/task/allTasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (data.status === "success") {
          setTasks(data.data);
        }
      } catch (error) {
        toast.error("Failed to load progression data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalTasks = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const ongoing = tasks.filter(t => t.status === 'Ongoing').length;
  const incomplete = tasks.filter(t => t.status === 'Incomplete').length;
  
  const totalProgress = tasks.reduce((sum, t) => sum + (t.progress || 0), 0);
  const avgProgress = totalTasks ? Math.round(totalProgress / totalTasks) : 0;

  const pieData = [
    { name: 'Completed', value: completed, color: '#22c55e' },
    { name: 'Ongoing', value: ongoing, color: '#f5a623' },
    { name: 'Incomplete', value: incomplete, color: '#ef4444' }
  ].filter(d => d.value > 0);

  const priorityData = [
    { name: 'High', count: tasks.filter(t => t.priorityLevel === 'High').length, fill: '#ef4444' },
    { name: 'Med', count: tasks.filter(t => t.priorityLevel === 'Medium').length, fill: '#f5a623' },
    { name: 'Low', count: tasks.filter(t => t.priorityLevel === 'Low').length, fill: '#3b82f6' }
  ];

  return (
    <div className="progression-wrapper">
      <SideBar />
      <main className="progression-main fade-in">
         <header className="progression-header">
            <h1 className="page-title">
              <TbChartPie className="title-icon" style={{ color: '#09A5DB' }} />
              Task Progression
            </h1>
            <p className="page-subtitle">Track your delivery velocity and actionable insights</p>
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
                        <span className="kpi-val">{completed}</span>
                        <span className="kpi-label">Total Completed</span>
                     </div>
                  </div>
                  
                  <div className="kpi-card">
                     <div className="kpi-icon-wrap" style={{ background: '#fff7ed', color: '#f5a623' }}>
                       <TbClockHour4 />
                     </div>
                     <div className="kpi-details">
                        <span className="kpi-val">{ongoing}</span>
                        <span className="kpi-label">Total Pending</span>
                     </div>
                  </div>

                  <div className="kpi-card">
                     <div className="kpi-icon-wrap" style={{ background: '#fef2f2', color: '#ef4444' }}>
                       <TbAlertCircle />
                     </div>
                     <div className="kpi-details">
                        <span className="kpi-val">{incomplete}</span>
                        <span className="kpi-label">Total Incomplete</span>
                     </div>
                  </div>

                  <div className="kpi-card">
                     <div className="kpi-icon-wrap" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                       <TbTrendingUp />
                     </div>
                     <div className="kpi-details">
                        <span className="kpi-val">{avgProgress}%</span>
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
