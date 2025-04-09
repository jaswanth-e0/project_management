import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import Projects from "./Projects";
import ProjectTasks from "./ProjectTasks";
import Tasks from "./Tasks";
import AdminLogin from "./AdminLogin";

const App = () => (
  <Router>
    <Routes>
    <Route path="/" element={<AdminLogin />} />
    <Route path="/home" element={<Home />} />
    <Route  path="/users" element={<Users />} />
    <Route  path="/projects" element={<Projects />} />
    <Route  path="/tasks" element={<Tasks />} />
    <Route path="/project/:projectId/tasks" element={<ProjectTasks />} />
    </Routes>
  </Router>
);

export default App;
