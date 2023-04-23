import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../Component/SideBar";
import {BallTriangle} from 'react-loader-spinner';
import '../Stylesheets/Task.css';
import Cookies from 'universal-cookie';

const TaskView =()=>{
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setloading] = useState(true);

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
          setloading(false);
        } else {
          setErrorMessage(data.message);
          setloading(false);
        }
      } catch (error) {
        setErrorMessage(error.message);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  if (errorMessage) {
    return (
      <div className="error">
        <p>{errorMessage}</p>
      </div>
    );
  }

  return(
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
      )}
    </>
  );
};

export default TaskView;
