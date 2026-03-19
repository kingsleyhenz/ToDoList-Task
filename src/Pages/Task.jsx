import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SideBar from "../Component/SideBar";
import { BallTriangle } from 'react-loader-spinner';
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
  TbPackageOff
} from 'react-icons/tb';
import BASE_URL from "../apiConfig";

const TaskView = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <>
      <div className="task-wrapper">
        <SideBar />
        <main className="task-main">
          <header className="task-header">
            <div className="header-text">
              <h1 className="page-title">
                <TbList className="title-icon" />
                Work Log
              </h1>
              <p className="page-subtitle">Track and manage your productivity</p>
            </div>
            <div className="task-stats">
              <div className="stat-item-mini">
                <span>{tasks.length}</span>
                <span>Total</span>
              </div>
              <div className="stat-item-mini">
                <span>{tasks.filter(t => t.status === 'Completed').length}</span>
                <span>Completed</span>
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
                    <th>Timeline</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map((t) => (
                      <tr key={t._id}>
                        <td className="task-cell-title">{t.head}</td>
                        <td>
                          <span className="badge badge-priority">{t.category}</span>
                        </td>
                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.item}
                        </td>
                        <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {new Date(t.startDate).toLocaleDateString()} — {new Date(t.endDate).toLocaleDateString()}
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
                      <td colSpan="6" className="empty-row-text">
                         <TbPackageOff style={{ fontSize: '2rem', marginBottom: '10px' }} />
                         <p>No task entries found. Your log is currently empty.</p>
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
