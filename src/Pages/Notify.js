import React from "react";
import SideBar from "../Component/SideBar";
import '../Stylesheets/Notify.css'

const Message =()=>{
    return(
        <>
            <div className="wrapper">
            <div className="head"></div>
            <div id="body-wrp">
                <SideBar/>
                <div className="homebody">
                    <h3>My Messages</h3>
                    <div className="msgbox"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Message