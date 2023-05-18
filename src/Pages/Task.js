import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import SideBar from "../Component/SideBar";
import { BallTriangle } from 'react-loader-spinner';
import '../Stylesheets/Task.css';
import Cookies from 'universal-cookie';

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
      const response = await axios.delete(`http://localhost:10000/api/v1/task/deleteTask/${taskId}`, {
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
          <BallTriangle type="Oval" color="orangered" height={80} width={80} />
        </div>
      ) : (
        <div className="wrapper">
          <div className="head">
            <p>L'aville TMS</p>
          </div>
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
                      {tasks.map((task) => (
                        <tr key={task._id}>
                          <td>{task.head}</td>
                          <td id='enh'>{task.item}</td>
                          <td>{task.category}</td>
                          <td>{task.status}</td>
                          <td>{new Date(task.startDate).toLocaleDateString()}</td>
                          <td>{new Date(task.endDate).toLocaleDateString()}</td>
                          <td>
                            <button id='upd' onClick={() => handleComplete(task._id)}>Complete</button>
                          </td>
                          <td><button id='del' onClick={() => handleDelete(task._id)}>Delete</button></td>
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
      )}
    </>
  );
};

export default TaskView;
