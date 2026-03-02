import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { initialProjects } from "../data/mockData";
import api from "../api";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    // TODO: Replace with API fetch call (`GET /api/projects/${id}`)
      const fetchProject = async () => {
        try {
          const response = await api.get(`/tasks/getallTasks/${id}`);
          console.log(response.data);
          setProject(response.data);
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      }
      fetchProject();
  }, [id]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim() || !project) return;
    // TODO: Replace with API fetch call (`POST /api/projects/${id}/tasks`)
    const newTask = {
      id: Date.now().toString(),
      name: newTaskText,
      status: 'pending',
    };

    setProject([...project, newTask]);
    setNewTaskText("");
  };

  const toggleTaskCompletion = (taskId) => {
    if (!project) return;
    // TODO: Replace with API fetch call (`PUT /api/tasks/${taskId}`)

    const updateStatus = async () => {
      try {
        const response = await api.put(`/tasks/status/${taskId}`,{
          status: 'completed'
        });
        console.log(response.data);
        setProject(...tasks.map(task => task.id === taskId ? {...task, status: 'completed'} : task), response.data);
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }


   
    
    updateStatus();
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center text-caramel-600 font-inter text-xl">
        Loading project details...
      </div>
    );
  }

  const completedCount = project.filter(t => t.status === 'completed').length;
  const totalCount = project.length;
  const progressPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-cream-50 p-8 font-inter">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <Link to="/" className="inline-flex items-center text-sm font-medium text-caramel-500 hover:text-brown-900 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        {/* Project Header Card */}
        <div className="bg-cream-100 rounded-3xl p-8 shadow-sm border border-wheat-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-brown-900 mb-3">{project.title}</h1>
              <p className="text-caramel-800 text-lg max-w-2xl leading-relaxed">{project.description}</p>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${project.status === 'Completed' ? 'bg-wheat-300 text-brown-900' : 'bg-wheat-200 text-caramel-800'}`}>
              {project.status}
            </span>
          </div>

          <div className="mt-8 pt-8 border-t border-wheat-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-caramel-800">Overall Progress</span>
              <span className="text-sm font-bold text-brown-900">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-wheat-200 rounded-full h-3">
              <div 
                className="bg-caramel-500 h-3 rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-wheat-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-brown-900 flex items-center gap-3">
              Tasks
              <span className="bg-wheat-100 text-caramel-800 py-1 px-3 rounded-full text-sm font-bold">
                {completedCount}/{totalCount}
              </span>
            </h2>
          </div>
          
          <div className="space-y-4 mb-8">
            {project.length === 0 ? (
              <div className="text-center py-10 bg-cream-50 rounded-2xl border border-dashed border-wheat-300">
                <p className="text-caramel-600 font-medium text-lg">No tasks yet.</p>
                <p className="text-caramel-400 text-sm mt-1">Add your first task below to get started.</p>
              </div>
            ) : (
              project.map(task => (
                <div 
                  key={task.id} 
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 group ${task.completed ? 'bg-cream-50 border-wheat-100' : 'bg-white border-wheat-100 hover:border-wheat-300 hover:shadow-sm'}`}
                >
                  <label className="flex items-center cursor-pointer relative shrink-0">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={task.status === 'completed'}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <div className={`w-7 h-7 rounded-md border-2 flex items-center justify-center transition-colors ${task.status === 'completed' ? 'bg-caramel-500 border-caramel-500' : 'border-wheat-300 bg-white group-hover:border-caramel-400'}`}>
                      {task.status === 'completed' && (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </label>
                  <span className={`text-[17px] font-medium transition-colors ${task.status === 'completed' ? 'line-through text-caramel-400' : 'text-brown-900'}`}>
                    {task.name}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Add Task Form */}
          <form onSubmit={handleAddTask} className="flex gap-4 p-2 bg-cream-50 rounded-2xl border border-wheat-200 focus-within:border-caramel-400 focus-within:ring-1 focus-within:ring-caramel-400 transition-all">
            <input
              type="text"
              required
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 bg-transparent px-5 py-3 text-brown-900 text-lg placeholder-caramel-400 focus:outline-none focus:ring-0"
            />
            <button 
              type="submit"
              className="bg-brown-900 hover:bg-black text-cream-50 px-8 py-3 rounded-xl font-semibold shadow-sm transition-colors duration-200"
            >
              Add
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
