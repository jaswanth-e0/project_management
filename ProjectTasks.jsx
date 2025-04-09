import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectTasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/Api/tasks?projectId=${projectId}`);
        setTasks(res.data.data); // Assuming your backend returns { data: [...] }
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    };

    fetchTasks();
  }, [projectId]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Tasks for Project ID: {projectId}</h2>
      {tasks.length === 0 ? (
        <p>No tasks found for this project.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li key={task._id} className="bg-red-300 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Title:{task.taskTitle}</h4>
              <p>Description{task.taskDescription}</p>
              <p>Status: <span className="font-medium">{task.taskStatus}</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectTasks;
