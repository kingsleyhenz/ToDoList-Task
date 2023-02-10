import React from "react";
import SideBar from "../Component/SideBar";
import axios from 'axios'
import '../Stylesheets/Todo.css'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import Cookies from "universal-cookie";


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

  const handleInputChange = event => {
    setTask({ ...task, [event.target.name]: event.target.value });
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
          timer: 1500
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

    return(
        <>
        <div className="wrapper">
    <div className="head"></div>
        <div id="body-wrp">
                <SideBar/>
            <div className="homebody">
                    <h3>Add New Tasks</h3>
                <div className="todobox">
                    <form className="adding">
                        <input type="text" name="head" placeholder="Title" value={task.head} onChange={handleInputChange}/>
                        <input type="text" name="item" placeholder="Task item" value={task.item} onChange={handleInputChange}/>
                        <input type="text" name="category" placeholder="Category" value={task.category} onChange={handleInputChange}/>
                        <input type="text" name="status" placeholder="Status" value={task.status} onChange={handleInputChange}/>
                        <input type="date" name="startDate" value={task.startDate} onChange={handleInputChange}/>
                        <input type="date" name="endDate" value={task.endDate} onChange={handleInputChange}/>
                        <button onClick={addNewTask}>Add Task</button>
                  </form>
                </div>
            </div>
          </div>
      </div>
        </>
    )
}

export default Todo