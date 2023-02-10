import React from "react";
import axios from "axios";
import {  useState ,useEffect } from "react";
import SideBar from "../Component/SideBar.js";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../Stylesheets/Home.css'
// to-do-list-task-silk.vercel.app

const Home =()=>{
    const [date, setDate] = React.useState(new Date());
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);
    
    useEffect(() => {
      setIsLoading(true);
      axios.get("https://kingsleystodolist.onrender.com/api/v1/task/allTasks")
        .then(res => {
          setTasks(res.data.data);
          setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
          setError(err);
          setIsLoading(false);
        });
    }, []);
  
    const onChange = (selectedDate) => {
      setDate(selectedDate);
    };
  
    return (
      <>
        <div className="wrapper">
          <div className="head"></div>
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
                <div className="time">{time}</div>
              </div>
              {tasks && tasks.length !== 0 ? (
          <div className="completed">Total Task:{tasks.length}</div>
) : (
  <div className="completed">No tasks found.</div>
)}
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Home;
  