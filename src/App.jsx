import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import SignUp from "./Pages/Intro";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Todo from "./Pages/Todo";
import TaskView from "./Pages/Task";
import Profile from "./Pages/Profile";
import "./App.css";

function App() {
  useEffect(() => {
    // Add fade-in animation to the app on load
    document.body.classList.add('fade-in');
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/task" element={<TaskView />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
