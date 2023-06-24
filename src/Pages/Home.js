import React from "react";
import axios from "axios";
import {  useState ,useEffect } from "react";
import SideBar from "../Component/SideBar.js";
import { NavLink } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import '../Stylesheets/Home.css'
import Cookies from "universal-cookie";
import {BallTriangle} from 'react-loader-spinner';
import withAuth from '../Component/withAuth';

const Home =()=>{
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setloading] = useState(true);
  const [incompleteTasks, setIncompleteTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [crucialTasks, setCrucialTasks] = useState(0);
  const [importantTasks, setImportantTasks] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);
    
    useEffect(() => {
      const fetchData = async () => {
        const cookie = new Cookies();
        const token = cookie.get("token");
        try {
          const response = await axios.get(
            "https://kingsleystodolist.onrender.com/api/v1/task/allTasks",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data;
          if (data.status === "success") {
            setTasks(data.data);
            setloading(false);
            setIncompleteTasks(
              data.data.filter((task) => task.status === "Incomplete").length
            );
            setCompletedTasks(
              data.data.filter((task) => task.status === "Completed").length
            );
            setCrucialTasks(
              data.data.filter((task) => task.category === "Crucial").length
            );
            setImportantTasks(
              data.data.filter((task) => task.category === "Important").length
            );
          } else {
            setErrorMessage(data.message);
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
      };
      fetchData();
    }, []);
    const CompletedTasks = ({ tasks }) => {
      if (tasks && tasks.length !== 0) {
        return (
          <div className="completed" id="cmp">{tasks.length}</div>
        );
      } else {
        return (
          <div className="completed" id="cmp">0</div>
        );
      }
    };
  
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
          <div className="body-wrp">
            <SideBar />
            <div className="Homebody">
              <div id="wlcmbx">
                <div className="hdbx">
                  <p>Welcome Back black henz, it is sure a wonderful day to get tasking</p>
                  <NavLink to="/Todo"><p>Add Task</p></NavLink>
                </div>
                <div className="hdbx">
                  <p>Hi black henz to take a look at all your tasks and see what needs to be completed</p>
                  <NavLink to="/Task"><p>View Tasks</p></NavLink>
                </div>
                <div className="hdbx">
                  <p>Total Tasks:</p>
                <CompletedTasks tasks={tasks}/>
                </div>
              </div>
            <div className="scndry">
            <div className="task-cat">
                <div className="cmpbx">
                 <p> Incompleted Tasks: </p>
                  <p>{incompleteTasks}</p>
                  </div>
                <div className="cmpbx">
                  <p>Completed Tasks: </p>
                  <p>{completedTasks}</p>
                  </div>
                <div className="cmpbx">
                  <p>Crucial Tasks:</p> 
                  <p>{crucialTasks}</p>
                  </div>
                <div className="cmpbx">
                  <p>Important Tasks:</p> 
                  <p>{importantTasks}</p>
                  </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        )}
      </>
    );
  }
  
  export default withAuth(Home);