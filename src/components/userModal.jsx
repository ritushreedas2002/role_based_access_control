
import React, { useState } from "react";
import { X, Check, User, Mail, UserCircle, Shield } from "lucide-react";

const permissionGroups = {
  Users: ["Create", "Read", "Update", "Delete"],
  Projects: ["Create", "Read", "Update", "Delete"],
};

const UserModal = ({ user, isEditing, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(
    user || {
      name: "",
      email: "",
      role: "client",
      status: "Active",
      permissions: {},
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionChange = (group, action) => {
    const updatedPermissions = { ...formData.permissions };
    if (!updatedPermissions[group]) updatedPermissions[group] = [];

    if (updatedPermissions[group].includes(action)) {
      updatedPermissions[group] = updatedPermissions[group].filter(
        (perm) => perm !== action
      );
    } else {
      updatedPermissions[group].push(action);
    }

    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <UserCircle className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {isEditing ? "Edit User Details" : "Add New User"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Group */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name Field */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm placeholder-gray-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                  placeholder="Enter full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm placeholder-gray-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                  placeholder="email@company.com"
                />
              </div>
            </div>
          </div>

          {/* Role and Status Group */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Role Dropdown */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 px-4 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="developer">Developer</option>
              </select>
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 px-4 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Permissions Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-400" />
              <label className="text-sm font-medium text-gray-700">
                Access Permissions
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(permissionGroups).map(([group, actions]) => (
                <div
                  key={group}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <h3 className="mb-3 font-medium text-gray-800">{group}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {actions.map((action) => {
                      const isChecked = formData.permissions[group]?.includes(action);
                      return (
                        <label
                          key={action}
                          className={`flex cursor-pointer items-center gap-2 rounded-md p-2 transition-colors ${
                            isChecked
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handlePermissionChange(group, action)}
                              className="opacity-0 absolute h-4 w-4 cursor-pointer"
                            />
                            <div
                              className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                                isChecked
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {isChecked && <Check className="h-3 w-3 text-white" />}
                            </div>
                          </div>
                          <span className="text-sm">{action}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isEditing ? "Save Changes" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;