import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../Component/SideBar";
import '../Stylesheets/Task.css'

const TaskView =()=>{
    const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://kingsleystodolist.onrender.com/api/v1/task/allTasks", {
      // headers: {
      // // authorization: `Bearer ${localStorage.getItem("token")}`
      // }
      })
      .then(res => {
        setTasks(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

    return(
        <>
            <div className="wrapper">
        <div className="head"></div>
        <div id="body-wrp">
          <SideBar />
          <div className="homebody">
            <h3>My Tasks</h3>
            <div className="msgbox">
              {tasks.length > 0 ? (
                <table id="tasks-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Item</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map(task => (
                      <tr key={task._id}>
                        <td>{task.head}</td>
                        <td>{task.item}</td>
                        <td>{task.category}</td>
                        <td>{task.status}</td>
                        <td>{task.startDate}</td>
                        <td>{task.endDate}</td>
                        <td><button id='upd'>Update</button></td>
                        <td><button id='del'>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No tasks added</p>
              )}
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default TaskView