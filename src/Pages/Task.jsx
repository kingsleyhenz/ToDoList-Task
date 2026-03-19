import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SideBar from "../Component/SideBar";
import '../Stylesheets/Task.css';
import Cookies from 'universal-cookie';
import withAuth from '../Component/withAuth';
import { 
  TbList, 
  TbCheck, 
  TbTrash, 
  TbCalendar, 
  TbFlag, 
  TbClock, 
  TbCheckbox,
  TbPackageOff,
  TbFilter
} from 'react-icons/tb';
import BASE_URL from "../apiConfig";

const TaskView = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All'); // 'All', 'Ongoing', 'Completed'

  const fetchData = async () => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    try {
      const { data } = await axios.get(`${BASE_URL}/allTasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.status === "success") {
        setTasks(data.data);
      }
    } catch (error) {
      console.error("Fetch failed", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleComplete = async (taskId) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    try {
      const { data } = await axios.patch(`${BASE_URL}/completeTask/${taskId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.status === 'success') {
        toast.success(data.message);
        setTasks((prev) =>
          prev.map((t) => (t._id === taskId ? { ...t, status: 'Completed' } : t))
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (taskId) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    try {
      const { data } = await axios.delete(`${BASE_URL}/deleteTask/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.status === 'success') {
        toast.success(data.message);
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  return (
    <>
      <div className="task-wrapper">
        <SideBar />
        <main className="task-main">
          <header className="task-header">
            <div className="header-text">
              <h1 className="page-title">
                <TbList className="title-icon" />
                All Tasks
              </h1>
              <p className="page-subtitle">Centralized hub for your entire productivity log</p>
            </div>
            
            <div className="task-header-actions">
               <div className="filter-system">
                 <button 
                   className={`filter-btn ${filter === 'All' ? 'active' : ''}`} 
                   onClick={() => setFilter('All')}
                 >
                   All ({tasks.length})
                 </button>
                 <button 
                   className={`filter-btn ${filter === 'Incomplete' ? 'active' : ''}`} 
                   onClick={() => setFilter('Incomplete')}
                 >
                   Pending
                 </button>
                 <button 
                   className={`filter-btn ${filter === 'Completed' ? 'active' : ''}`} 
                   onClick={() => setFilter('Completed')}
                 >
                   Completed
                 </button>
               </div>
            </div>
          </header>

          <div className="table-container">
            {loading ? (
              <div className="table-loader" style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                <div className="modern-spinner" style={{ width: '32px', height: '32px' }}></div>
              </div>
            ) : (
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Priority</th>
                    <th>Details</th>
                    <th>Progress</th>
                    <th>Timeline</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((t) => (
                      <tr key={t._id} className="fade-in">
                        <td className="task-cell-title">{t.title || t.head}</td>
                        <td>
                          <span className="badge badge-priority">{t.priorityLevel || t.category}</span>
                        </td>
                        <td className="table-truncate-cell">
                          {t.description || t.item}
                        </td>
                        <td>
                           <div className="table-progress-bar">
                             <div className="progress-bg">
                                <div className="progress-fill" style={{ width: `${t.progress || 0}%` }}></div>
                             </div>
                             <span>{t.progress || 0}%</span>
                           </div>
                        </td>
                        <td className="table-date-cell">
                          {t.startDate ? new Date(t.startDate).toLocaleDateString() : '—'} ➔ {t.endDate ? new Date(t.endDate).toLocaleDateString() : '—'}
                        </td>
                        <td>
                          <span className={`badge ${t.status === 'Completed' ? 'badge-status-completed' : 'badge-status-pending'}`}>
                            {t.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                            {t.status !== 'Completed' && (
                              <button className="btn-icon-action" onClick={() => handleComplete(t._id)}>
                                <TbCheck />
                              </button>
                            )}
                            <button className="btn-icon-action delete" onClick={() => handleDelete(t._id)}>
                              <TbTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="empty-row-text">
                         <TbPackageOff style={{ fontSize: '2rem', marginBottom: '10px' }} />
                         <p>No matches found in your {filter} list.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuth(TaskView);
