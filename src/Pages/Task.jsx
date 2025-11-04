import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import SideBar from "../Component/SideBar";
import { BallTriangle } from 'react-loader-spinner';
import '../Stylesheets/Task.css';
import Cookies from 'universal-cookie';
import withAuth from '../Component/withAuth';
import { TbList, TbCheck, TbTrash, TbCalendar, TbFlag, TbClock, TbCheckbox } from 'react-icons/tb';

const TaskView = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cookie = new Cookies();
      const token = cookie.get("token");
      try {
        const response = await axios.get("https://kingsleystodolist.onrender.com/api/v1/task/allTasks", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        if (data.status === "success") {
          setTasks(data.data);
          setLoading(false);
        } else {
          setErrorMessage(data.message);
          setLoading(false);
        }
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleComplete = async (taskId) => {
    const cookie = new Cookies();
      const token = cookie.get("token");
    try {
      const response = await axios.patch(`https://kingsleystodolist.onrender.com/api/v1/task/completeTask/${taskId}`,null,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      if (data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: data.message,
          icon: 'success',
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: 'Completed' } : task
          )
        );
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
      });
    }
  };

  const handleDelete = async (taskId) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    try {
      const response = await axios.delete(`https://kingsleystodolist.onrender.com/api/v1/task/deleteTask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      if (data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: data.message,
          icon: 'success',
        });
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
      });
    }
  };

  if (errorMessage) {
    return (
      <div className="error">
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="loader-content">
            <BallTriangle type="Oval" color="#3b82f6" height={60} width={60} />
            <p>Loading your tasks...</p>
          </div>
        </div>
      ) : (
        <div className="task-wrapper">
          <SideBar />
          <main className="task-main">
            <div className="task-header">
              <div className="header-content">
                <h1 className="page-title">
                  <TbList className="title-icon" />
                  My Tasks
                </h1>
                <p className="page-subtitle">View and manage all your tasks</p>
              </div>
              <div className="task-stats">
                <div className="stat-card">
                  <TbCheckbox className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-number">{tasks.length}</span>
                    <span className="stat-label">Total Tasks</span>
                  </div>
                </div>
                <div className="stat-card">
                  <TbCheck className="stat-icon completed" />
                  <div className="stat-info">
                    <span className="stat-number">{tasks.filter(task => task.status === 'Completed').length}</span>
                    <span className="stat-label">Completed</span>
                  </div>
                </div>
                <div className="stat-card">
                  <TbClock className="stat-icon pending" />
                  <div className="stat-info">
                    <span className="stat-number">{tasks.filter(task => task.status !== 'Completed').length}</span>
                    <span className="stat-label">Pending</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="task-content">
              {errorMessage ? (
                <div className="error-message">
                  <p>{errorMessage}</p>
                </div>
              ) : tasks.length > 0 ? (
                <div className="tasks-grid">
                  {tasks.map((task) => (
                    <div key={task._id} className={`task-card ${task.status === 'Completed' ? 'completed' : ''}`}>
                      <div className="task-header-card">
                        <div className="task-title">
                          <h3>{task.head}</h3>
                          <span className={`priority-badge ${task.category?.toLowerCase()}`}>
                            <TbFlag className="priority-icon" />
                            {task.category}
                          </span>
                        </div>
                        <div className="task-actions">
                          {task.status !== 'Completed' && (
                            <button 
                              className="btn-complete" 
                              onClick={() => handleComplete(task._id)}
                              title="Mark as complete"
                            >
                              <TbCheck />
                            </button>
                          )}
                          <button 
                            className="btn-delete" 
                            onClick={() => handleDelete(task._id)}
                            title="Delete task"
                          >
                            <TbTrash />
                          </button>
                        </div>
                      </div>
                      
                      <div className="task-description">
                        <p>{task.item}</p>
                      </div>
                      
                      <div className="task-meta">
                        <div className="task-dates">
                          <div className="date-item">
                            <TbCalendar className="date-icon" />
                            <span>Start: {new Date(task.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="date-item">
                            <TbCalendar className="date-icon" />
                            <span>Due: {new Date(task.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className={`status-badge ${task.status?.toLowerCase()}`}>
                          {task.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <TbList />
                  </div>
                  <h3>No tasks yet</h3>
                  <p>Start by creating your first task to stay organized</p>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default withAuth(TaskView);
