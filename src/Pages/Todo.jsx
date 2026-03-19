import React, { useState, useEffect } from "react";
import SideBar from "../Component/SideBar";
import axios from 'axios';
import '../Stylesheets/Todo.css';
import toast from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner';
import Cookies from "universal-cookie";
import withAuth from "../Component/withAuth";
import { TbPlus, TbCalendar, TbFlag, TbBookmark, TbCirclePlus } from 'react-icons/tb';
import BASE_URL from "../apiConfig";

const Todo = () => {
  const [task, setTask] = useState({ 
    head: "", 
    item: "", 
    category: "", 
    status: "Incomplete", 
    startDate: "",
    endDate: "" 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const addNewTask = async (event) => {
    event.preventDefault();
    const cookie = new Cookies();
    const token = cookie.get("token");
  
    try {
      const { data } = await axios.post(`${BASE_URL}/create`, task, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.status === "success") {
        toast.success('Task created successfully');
        setTask({ head: "", item: "", category: "", status: "Incomplete", startDate: "", endDate: "" });
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
           <div className="modern-spinner"></div>
        </div>
      ) : (
        <div className="todo-wrapper">
          <SideBar />
          <main className="todo-main">
            <header className="todo-header">
              <h1 className="page-title">
                <TbCirclePlus className="title-icon" />
                Create Task
              </h1>
              <p className="page-subtitle">Schedule and organize your goals</p>
            </header>

            <div className="task-form-container">
              <form className="task-form" onSubmit={addNewTask}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="head">
                      <TbBookmark className="label-icon" />
                      Title
                    </label>
                    <input 
                      type="text" 
                      id="head"
                      name="head" 
                      placeholder="e.g., Q1 Strategic Planning" 
                      value={task.head} 
                      onChange={handleInputChange} 
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="category">
                      <TbFlag className="label-icon" />
                      Priority
                    </label>
                    <select 
                      id="category"
                      name="category" 
                      value={task.category} 
                      onChange={handleInputChange} 
                      className="form-select"
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="Important">Important</option>
                      <option value="Crucial">Crucial</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="item">Description</label>
                  <textarea 
                    id="item"
                    name="item" 
                    placeholder="Enter details..." 
                    value={task.item} 
                    onChange={handleInputChange} 
                    className="form-textarea"
                    rows="4"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="startDate">
                      <TbCalendar className="label-icon" />
                      Start Date
                    </label>
                    <input 
                      type="date" 
                      id="startDate"
                      name="startDate" 
                      value={task.startDate} 
                      onChange={handleInputChange} 
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="endDate">
                      <TbCalendar className="label-icon" />
                      Due Date
                    </label>
                    <input 
                      type="date" 
                      id="endDate"
                      name="endDate" 
                      value={task.endDate} 
                      onChange={handleInputChange} 
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-actions" style={{ marginTop: '1rem' }}>
                  <button type="submit" className="btn-primary">
                    <TbPlus style={{ fontSize: '1.2rem' }} />
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default withAuth(Todo);