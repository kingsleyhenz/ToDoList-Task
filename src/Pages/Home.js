import React from "react";
import SideBar from "../Component/SideBar.js";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../Stylesheets/Home.css'

const Home =()=>{
const [date, setDate] = React.useState(new Date());
const [time, setTime] = React.useState(new Date().toLocaleTimeString());

React.useEffect(() => {
const intervalId = setInterval(() => {
setTime(new Date().toLocaleTimeString());
}, 1000);
return () => clearInterval(intervalId);
}, []);
const onChange = (selectedDate) => {
    setDate(selectedDate);
};



return(
    <>
    <div className="wrapper">
        <div className="head"></div>
        <div className="body-wrp">
            <SideBar/>
        <div className="Homebody">
            <div id="wlcmtxt">
                <h3>Home Page</h3>
                <h2>Kingsley Henshaw</h2>
            </div>
            <div id="date-time">
                <div className="date">
                    <Calendar onChange={onChange} value={date} className="cal"/>
                </div>
                <div className="time">{time}</div>
            </div>
            <div className="completed">

            </div>
        </div>
        </div>
    </div>
    </>
)
}

export default Home;