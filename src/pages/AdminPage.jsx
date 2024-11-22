
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, UserPlus, Filter, Edit, Trash2 } from "lucide-react";
import UserModal from "../components/userModal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/users";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch users. Please try again later.");
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterUsers(term, selectedRole);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    filterUsers(searchTerm, role);
  };

  const filterUsers = (searchTerm, role) => {
    let filtered = users;
    if (role !== "all") {
      filtered = filtered.filter((user) => user.role === role);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.role.toLowerCase().includes(searchTerm) ||
          user.status.toLowerCase().includes(searchTerm)
      );
    }
    setFilteredUsers(filtered);
  };

  const handleRoleChange = async (user, newRole) => {
    try {
      const updatedUser = { ...user, role: newRole };
      await axios.put(`${API_URL}/${user.id}`, updatedUser);
      fetchUsers();
    } catch (error) {
      setError("Failed to update user role. Please try again.");
      console.error("Error updating role:", error);
    }
  };

  const handleStatusChange = async (user, newStatus) => {
    try {
      const updatedUser = { ...user, status: newStatus };
      await axios.put(`${API_URL}/${user.id}`, updatedUser);
      fetchUsers();
    } catch (error) {
      setError("Failed to update user status. Please try again.");
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_URL}/${userId}`);
        fetchUsers();
      } catch (error) {
        setError("Failed to delete user. Please try again.");
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (user) => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${user.id}`, user);
      } else {
        await axios.post(API_URL, user);
      }
      fetchUsers();
      setIsModalOpen(false);
      setError(null);
    } catch (error) {
      setError("Failed to save user. Please try again.");
      console.error("Error submitting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:mt-0 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="mt-1 text-sm text-gray-500">
                Total Users: {filteredUsers.length}
              </p>
            </div>
            <button
              onClick={handleAddUser}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add New User
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-900 border border-red-200">
            {error}
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Filters Section */}
          <div className="p-4 border-b border-gray-200 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedRole}
                onChange={(e) => handleRoleFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="developer">Developer</option>
              </select>
            </div>
          </div>

          {/* Table with fixed header */}
          <div className="relative">
            {/* Fixed Header */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 w-2/5">
                    User
                  </th>
                  <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 w-1/5">
                    Role
                  </th>
                  <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 w-1/5">
                    Status
                  </th>
                  <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 w-1/5">
                    Actions
                  </th>
                </tr>
              </thead>
            </table>
            
            {/* Scrollable Body */}
            <div className="overflow-y-auto h-[420px] rounded-xl">
              <table className="min-w-full divide-y divide-gray-200 ">
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap w-2/5">
                        <div className="flex items-center">
                          <img
                            src={`https://i.pravatar.cc/40?u=${user.id}`}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-1/5">
                        <select
                          className="text-sm rounded-full px-3 py-1 bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500"
                          value={user.role}
                          onChange={(e) => handleRoleChange(user, e.target.value)}
                        >
                          <option value="admin">Admin</option>
                          <option value="client">Client</option>
                          <option value="developer">Developer</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-1/5">
                        <select
                          className={`text-sm rounded-full px-3 py-1 ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                          value={user.status}
                          onChange={(e) => handleStatusChange(user, e.target.value)}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/5">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <UserModal
          user={currentUser}
          isEditing={isEditing}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;