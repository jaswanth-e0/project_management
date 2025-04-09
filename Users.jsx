import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
const token = localStorage.getItem("token");
const Users = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "User",
  });

  const [users, setUsers] = useState([]);
  const [Id, setId] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setFormData({ fullName: user.fullName, email: user.email, password:user.password, role: user.role });
    setId(user._id);
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Api/users",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
      console.log(response.data)
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    console.log(id)
    try {
      await axios.delete(`http://localhost:3000/Api/users/${id}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      alert("Error deleting user");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get token from storage
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      if (Id) {
        console.log(Id);
        await axios.put(`http://localhost:3000/Api/users/${Id}`, formData, config);
        alert("User updated successfully");
        setId(null);
      } else {
        const response = await axios.post("http://localhost:3000/Api/users", formData, config);
        setUsers([...users, response.data]);
        alert("User registered successfully");
      }
  
      setFormData({ fullName: "", email: "", password: "", role: "User" });
      setTimeout(fetchUsers, 500);
    } catch (error) {
      alert("Error: " + (error.response ? error.response.data.error : "Unknown error"));
    }
  };
  
  return (
    <div className="flex-column items-center justify-between min-h-screen bg-gray-100 pt-10 w-300 pl-60">
      <div className="bg-red-300 p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <form  onSubmit={handleSubmit}  className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required={!Id}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            {Id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      <h4 className="text-black pt-5">Stored Data</h4>
      <table className="w-full border-collapse border border-gray-300 mt-5">
        <thead>
          <tr className="bg-gray-200 text-blue-500">
            <th className="border border-gray-300 p-2">Sno</th>
            <th className="border border-gray-300 p-2">Full Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Edit</th>
            <th className="border border-gray-300 p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
  {users && users.length > 0 ? users.map((user, index) => (
    <tr key={user._id || index} className="bg-gray-200">
      <td className="text-blue-500 pl-5">{index + 1}</td>
      <td className="text-blue-500">{user.fullName}</td>
      <td className="text-blue-500">{user.email}</td>
      <td className="text-blue-500">{user.role}</td>
      <td>
        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => handleEdit(user)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
          >
            Edit
          </button>
          </div>
       </td>
        <td>
          <button
            onClick={() => handleDelete(user._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </td>
    </tr>
  )) : (
    <tr>
      <td colSpan="5" className="text-center text-gray-500 p-4">No users found</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default Users;