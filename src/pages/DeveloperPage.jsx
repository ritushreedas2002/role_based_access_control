

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Calendar, ChevronRight } from "lucide-react";
import { projectService } from "../services/projectservice";
import { useSelector } from "react-redux";

const DeveloperPage = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const userPermissions = useSelector((state) => state.user.userPermissions);
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects", error);
    }
  };

  const handleCreateProject = () => {
    setFormData({ title: "", description: "" });
    setEditingProject(null);
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    if (userPermissions.Projects.includes("Update")) {
      setFormData({ title: project.title, description: project.description });
      setEditingProject(project);
      setShowModal(true);
    } else {
      alert("You do not have permission to edit projects.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (userPermissions.Projects.includes("Delete")) {
      try {
        await projectService.deleteProject(projectId);
        setProjects((prevProjects) =>
          prevProjects.filter((p) => p.id !== projectId)
        );
      } catch (error) {
        console.error("Failed to delete project", error);
      }
    } else {
      alert("You do not have permission to delete projects.");
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) return;

    try {
      if (editingProject) {
        const updatedProject = await projectService.updateProject({
          ...editingProject,
          ...formData,
        });
        setProjects((prevProjects) =>
          prevProjects.map((p) =>
            p.id === updatedProject.id ? updatedProject : p
          )
        );
      } else {
        if (userPermissions.Projects.includes("Create")) {
          const newProject = await projectService.createProject(formData);
          setProjects((prevProjects) => [newProject, ...prevProjects]);
        } else {
          alert("You do not have permission to create projects.");
        }
      }

      setShowModal(false);
      setFormData({ title: "", description: "" });
      setEditingProject(null);
    } catch (error) {
      console.error(
        editingProject
          ? "Failed to update project"
          : "Failed to create project",
        error
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:mt-0 mt-20">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-100 sticky md:top-0 top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Project Hub
            </h1>
            {userPermissions.Projects.includes("Create") && (
              <button
                onClick={handleCreateProject}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                <Plus className="mr-2 h-5 w-5" />
                New Project
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out border border-gray-100 overflow-hidden group"
            >
              {/* Project Header */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                    {project.title}
                  </h2>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {userPermissions.Projects.includes("Update") && (
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    )}
                    {userPermissions.Projects.includes("Delete") && (
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal - with modern styling */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl transform transition-all">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingProject ? "Edit Project" : "Create New Project"}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title
                </label>
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                  rows={4}
                  placeholder="Enter project description"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  onClick={handleSubmit}
                >
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperPage;