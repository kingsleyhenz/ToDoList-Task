import React from "react";
import SideBar from "../Component/SideBar";
import axios from 'axios'
import '../Stylesheets/Todo.css'
import Swal from 'sweetalert2'
import {BallTriangle} from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import withAuth from "../Component/withAuth";
import { TbPlus, TbCalendar, TbFlag, TbBookmark } from 'react-icons/tb';


const Todo =()=>{
  const [task, setTask] = useState({ 
    head: "", 
    item: "", 
    category: "", 
    status: "Incomplete", 
    startDate: "",
    endDate: "" 
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setloading] = useState(true);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const addNewTask = async (event) => {
    event.preventDefault()
    const cookie = new  Cookies()
    const token = cookie.get("token")
  
    console.log(task);
    try {
      const response = await axios.post("https://kingsleystodolist.onrender.com/api/v1/task/create", task,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      if (data.status === "success") {
        setTasks([...tasks, data.task]);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Task added successfully',
          showConfirmButton: false,
          timer: 1500,
          background: '#ffffff',
          color: '#1e293b',
          iconColor: '#3b82f6',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Error with task addition",
        })
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred',
      })
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setloading(false);
    }, 1000); // Set isLoading to false after 5 seconds
    return () => clearTimeout(timerId);
  }, []);

    return(
        <>
        {loading ? (
          <div className="loader-container">
            <div className="loader-content">
              <BallTriangle type="Oval" color="#3b82f6" height={60} width={60} />
              <p>Loading your tasks...</p>
            </div>
          </div>
        ) : (
          <div className="todo-wrapper">
            <SideBar/>
            <main className="todo-main">
              <div className="todo-header">
                <div className="header-content">
                  <h1 className="page-title">
                    <TbPlus className="title-icon" />
                    Create New Task
                  </h1>
                  <p className="page-subtitle">Add a new task to your workspace and stay organized</p>
                </div>
              </div>

              <div className="todo-content">
                <div className="task-form-container">
                  <form className="task-form" onSubmit={(e) => {e.preventDefault(); addNewTask(e);}}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="head">
                          <TbBookmark className="label-icon" />
                          Task Title
                        </label>
                        <input 
                          type="text" 
                          id="head"
                          name="head" 
                          placeholder="Enter task title" 
                          value={task.head} 
                          onChange={handleInputChange} 
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="category">
                          <TbFlag className="label-icon" />
                          Priority Level
                        </label>
                        <select 
                          id="category"
                          name="category" 
                          value={task.category} 
                          onChange={handleInputChange} 
                          className="form-select"
                          required
                        >
                          <option value="">Select priority</option>
                          <option value="Important">Important</option>
                          <option value="Crucial">Crucial</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="item">Task Description</label>
                      <textarea 
                        id="item"
                        name="item" 
                        placeholder="Describe your task in detail..." 
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

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        <TbPlus className="btn-icon" />
                        Create Task
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
        )}
        </>
    )
}

export default withAuth(Todo)