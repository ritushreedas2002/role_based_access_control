
  const API_URL = 'http://localhost:5000/projects';
  
  export const projectService = {
  
    getProjects: async () => {
      try {
        const response = await fetch(`${API_URL}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data; 
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        throw error;
      }
    },
  
    
    createProject: async (project) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...project,
          createdAt: new Date().toISOString(),
        }),
      });
      return response.json();
    },
  
    
    updateProject: async (project) => {
      const response = await fetch(`${API_URL}/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      return response.json();
    },
  
  
    deleteProject: async (id) => {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
    },
  };