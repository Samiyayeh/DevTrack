import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;

    // TODO: Replace with API fetch call (`POST /api/projects`)
    const newProject = {
      name: newProjectTitle,
      description: newProjectDesc,
    };

    try {
      const response = await api.post('/projects', newProject);

         setProjects([...projects, response.data]);
    } catch (error) {
      console.error('Error creating project:', error);
    }


 
    setNewProjectTitle("");
    setNewProjectDesc("");
    setIsModalOpen(false);
  };


  const checkTasks = (project) => {
    const taskTitle = project?.Tasks;
    if (!taskTitle) {
      return "No tasks yet";
    }
    return `${project.Tasks.length} ${project.Tasks.length === 1 ? 'Task' : 'Tasks'}`;
  }

  return (
    <div className="min-h-screen bg-cream-50 p-8 font-inter">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-brown-900 tracking-tight">DevTrack Dashboard</h1>
            <p className="text-caramel-600 mt-2 text-lg">Manage your projects elegantly.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-caramel-600 hover:bg-caramel-800 text-cream-50 px-6 py-3 rounded-xl font-medium shadow-sm transition-colors duration-200"
          >
            + Create Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}/${project.name}/${project.description}/${project.status}`}
              className="bg-cream-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-wheat-100 flex flex-col h-full"
            >
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-brown-900 line-clamp-1">{project.name}</h2>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${project.status === 'Completed' ? 'bg-wheat-300 text-brown-900' : 'bg-wheat-100 text-caramel-800'}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-caramel-600 text-sm line-clamp-3 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>
              <div className="pt-4 border-t border-wheat-200 flex justify-between items-center text-sm font-medium text-caramel-500">
                <span> {checkTasks(project)}</span>
                <span className="text-caramel-500 hover:text-brown-900 transition-colors">View Details &rarr;</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-brown-900/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
            <div className="bg-cream-50 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-wheat-100 scale-100 transition-transform">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-brown-900">New Project</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-caramel-400 hover:text-brown-900 p-2 text-2xl leading-none">&times;</button>
              </div>
              <form onSubmit={handleCreateProject} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-caramel-800 mb-1.5">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    className="w-full bg-white border border-wheat-200 text-brown-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-caramel-400 focus:border-transparent transition-all"
                    placeholder="e.g. Website Overhaul"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-caramel-800 mb-1.5">Description</label>
                  <textarea
                    rows="3"
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    className="w-full bg-white border border-wheat-200 text-brown-900 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-caramel-400 focus:border-transparent transition-all"
                    placeholder="Briefly describe the goal..."
                  ></textarea>
                </div>
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-wheat-100 hover:bg-wheat-200 text-caramel-800 font-medium px-4 py-3 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-caramel-600 hover:bg-caramel-800 text-cream-50 font-medium px-4 py-3 rounded-xl shadow-sm transition-colors"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
