import React from "react";
import { Outlet } from "react-router-dom";
import RoleBasedNavigation from "../Sidebar";
import { useSelector } from "react-redux";

const ProtectedLayout = () => {

  const userRole = useSelector((state) => state.user.userRole);

  if (!userRole) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-700 mb-6">
            You are not authorized to view this page. Please log in with the
            correct credentials or contact your administrator for help.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }


  return (
    <div className="flex">
      
      <RoleBasedNavigation userRole={userRole} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <Outlet /> 
      </div>
    </div>
  );
};

export default ProtectedLayout;