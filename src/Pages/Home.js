import React from "react";
import SideBar from "../Component/SideBar.js";
import '../Stylesheets/Home.css'


const Home =()=>{
    return(
        <>
        <div className="wrapper">
            <div className="head"></div>
            <div className="body-wrp">
                {/* <SideBar/> */}
            <div className="Homebody">
                <div id="wlcmtxt">
                    <h3>Welcome!</h3>
                    <h2>Kingsley Henshaw</h2>
                </div>
                <div id="date-time">
                    <div className="date"></div>
                    <div className="time"></div>
                </div>
                <div className="completed">

                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Home