import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const Tasks = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
    startDate: "",
    endDate: "",
    projectId: "",
    assignedUsers: "",
    createdBy: "",
  });

  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Api/tasks");
      setTasks(response.data.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setFormData({
      title: task.taskTitle,
      description: task.taskDescription,
      status: task.taskStatus,
      startDate: task.startDate?.split("T")[0] || "",
      endDate: task.endDate?.split("T")[0] || "",
      projectId: task.projectId,
      assignedUsers: task.assignedUsers.join(","),
      createdBy: task.createdBy,
    });
    setTaskId(task._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Api/tasks/${id}`);
      alert("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      alert("Error deleting task");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      taskTitle: formData.title,
      taskDescription: formData.description,
      taskStatus: formData.status,
      startDate: formData.startDate,
      endDate: formData.endDate,
      projectId: formData.projectId,
      assignedUsers: formData.assignedUsers.split(",").map((u) => u.trim()),
      createdBy: formData.createdBy,
    };

    try {
      if (taskId) {
        await axios.put(`http://localhost:3000/Api/tasks/${taskId}`, payload);
        alert("Task updated successfully");
        setTaskId(null);
      } else {
        const response = await axios.post("http://localhost:3000/Api/tasks", payload);
        setTasks([...tasks, response.data]);
        alert("Task added successfully");
      }

      setFormData({
        title: "",
        description: "",
        status: "To Do",
        startDate: "",
        endDate: "",
        projectId: "",
        assignedUsers: "",
        createdBy: "",
      });
      setTimeout(fetchTasks, 500);
    } catch (error) {
      alert("Error: " + (error.response ? error.response.data.error : "Unknown error"));
    }
  };

  return (
    <div className="flex-column items-center justify-between min-h-screen bg-gray-100 pt-10 w-300 pl-60 text-red-500">
      <div className="bg-blue-300 p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Task Title" value={formData.title} onChange={handleChange} required className="w-full text-white-500 p-3 border border-gray-300 rounded-lg" />
          <textarea name="description" placeholder="Task Description" value={formData.description} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
          <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 text-red-600 border border-gray-300 rounded-lg">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          <input type="text" name="projectId" placeholder="Project ID" value={formData.projectId} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
          <input type="text" name="assignedUsers" placeholder="Assigned Users (comma-separated)" value={formData.assignedUsers} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
          <input type="text" name="createdBy" placeholder="Created By (User ID)" value={formData.createdBy} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
            {taskId ? "Update" : "Add Task"}
          </button>
        </form>
      </div>

      <h4 className="text-black pt-5">Task List</h4>
      <table className="w-full border-collapse border border-gray-300 mt-5">
        <thead>
          <tr className="bg-gray-200 text-blue-800">
            <th className="border p-2">Sno</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">ProjectId</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Edit</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task._id || index} className="bg-gray-200">
                <td className="text-blue-600">{index + 1}</td>
                <td className="text-blue-600">{task.taskTitle}</td>
                <td className="text-blue-600">{task.projectId}</td>
                <td className="text-blue-600">{task.taskStatus}</td>
                <td>
                  <button onClick={() => handleEdit(task)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-700">
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 p-4">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
