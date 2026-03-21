import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import SignUp from "./Pages/Intro";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Todo from "./Pages/Todo";
import TaskView from "./Pages/Task";
import Profile from "./Pages/Profile";
import CreatePassword from "./Pages/CreatePassword";
import Subscription from "./Pages/Subscription";
import Progression from "./Pages/Progression";
import { Toaster } from "react-hot-toast";
import "./App.css";


function App() {
  useEffect(() => {
    document.body.classList.add('fade-in');
  }, []);

  return (
    <div className="app-container">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/task" element={<TaskView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/progression" element={<Progression />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </div>
  );
}

export default App;
