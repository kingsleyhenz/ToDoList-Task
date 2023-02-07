import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Intro";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Todo from "./Pages/Todo";
import Message from "./Pages/Notify";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/notify" element={<Message />} />
      </Routes>
    </>
  );
}

export default App;
