import React from "react";
import axios from "axios";
import {  useState ,useEffect } from "react";
import SideBar from "../Component/SideBar.js";
import Calendar from "react-calendar";
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
  
    const onChange = (selectedDate) => {
      setDate(selectedDate);
    };

    const CompletedTasks = ({ tasks }) => {
      if (tasks && tasks.length !== 0) {
        return (
          <div className="completed"><h2>Total Tasks: {tasks.length}</h2></div>
        );
      } else {
        return (
          <div className="completed"><h2>No tasks found.</h2></div>
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
              <div id="wlcmtxt">
                <h3>Home Page</h3>
              </div>
              <div id="date-time">
                <div className="date">
                  <Calendar onChange={onChange} value={date} className="cal"/>
                </div>
                <div className="time"><h2>{time}</h2></div>
              </div>
            <CompletedTasks tasks={tasks}/>
            <div className="task-cat">
                <p>Incompleted Tasks: {incompleteTasks}</p>
                <p>Completed Tasks: {completedTasks}</p>
                <p>Crucial Tasks: {crucialTasks}</p>
                <p>Important Tasks: {importantTasks}</p>
            </div>
            </div>
          </div>
        </div>
        )}
      </>
    );
  }
  
  export default withAuth(Home);