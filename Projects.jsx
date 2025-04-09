import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import {Link} from "react-router-dom"

const Projects = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    assignedUsers: "",
    createdBy: "",
  });

  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Api/projects");
      setProjects(response.data.data);
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project) => {
    setFormData({
      title: project.projectTitle,
      description: project.projectDescription,
      status: project.projectStatus,
      assignedUsers: project.assignedUsers.join(","),
      createdBy: project.createdBy,
    });
    
    setProjectId(project._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Api/projects/${id}`);
      alert("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      alert("Error deleting project");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      projectTitle: formData.title,
      projectDescription: formData.description,
      projectStatus: formData.status,
      assignedUsers: formData.assignedUsers.split(",").map((u) => u.trim()),
      createdBy: formData.createdBy,
    };
    
    try {
      if (projectId) {
        await axios.put(`http://localhost:3000/Api/projects/${projectId}`, payload);
        alert("Project updated successfully");
        setProjectId(null);
      } else {
        const response = await axios.post("http://localhost:3000/Api/projects", payload);
        setProjects([...projects, response.data]);
        alert("Project added successfully");
      }

      setFormData({
        title: "",
        description: "",
        status: "Pending",
        assignedUsers: "",
        createdBy: "",
      });
      setTimeout(fetchProjects, 500);
    } catch (error) {
      alert("Error: " + (error.response ? error.response.data.error : "Unknown error"));
    }
  };

  return (
    <div className="flex-column items-center justify-between min-h-screen bg-gray-100 pt-10 w-300 pl-60 text-blue-700">
      <div className="bg-green-300 p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full text-blue-500 p-3 border border-gray-300 rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="text"
            name="assignedUsers"
            placeholder="Assigned Users (comma-separated)"
            value={formData.assignedUsers}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="createdBy"
            placeholder="Created By (User ID or Email)"
            value={formData.createdBy}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            {projectId ? "Update" : "Add Project"}
          </button>
        </form>
      </div>

      <h4 className="text-black pt-5">Project List</h4>
      <table className="w-full border-collapse border border-gray-300 mt-5">
        <thead>
          <tr className="bg-gray-200 text-green-700">
            <th className="border p-2">Sno</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Edit</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <tr key={project._id || index} className="bg-gray-200">
                <td className="text-green-600">{index + 1}</td>
                <Link to={`/project/${project._id}/tasks`}>{project.projectTitle}</Link>
                <td className="text-green-600">{project.projectStatus}</td>
                <td>
                  <button
                    onClick={() => handleEdit(project)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 p-4">
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
