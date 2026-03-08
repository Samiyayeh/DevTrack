import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function ProjectDetails() {
  const { id, name, description, status } = useParams();
  const [task, newtask] = useState(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  useEffect(() => {
    // TODO: Replace with API fetch call (`GET /api/tasks/${id}`)
      const fetchTask = async () => {
        try {
          const response = await api.get(`/tasks/getallTasks/${id}`);
          console.log(response.data);
          newtask(response.data);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      }
      fetchTask();
  }, [id]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim() || !task) return;
    // TODO: Replace with API fetch call (`POST /api/tasks/${id}`)
    const newTask = {
      name: newTaskText,
      status: 'pending',
    };

    try {
      const response = await api.post(`/tasks/${id}`, newTask, { projectId: id });
      console.log(response.data);
      newtask([...task, response.data]);
      setNewTaskText("");
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      // 1. Toggle the status string
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';

      // 2. Update the Frontend State (the array)
      newtask(prevTasks => 
        prevTasks.map(t => 
          t.id === taskId ? { ...t, status: newStatus } : t
        )
      );
      
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      newtask(task.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const startEditTask = (t) => {
    setEditingTaskId(t.id);
    setEditingTaskName(t.name);
  };

  const saveEditTask = async (taskId) => {
    if (!editingTaskName.trim()) return;
    try {
      const response = await api.put(`/tasks/${taskId}`, { name: editingTaskName });
      if (response.status === 201) {
        newtask(task.map(t => t.id === taskId ? { ...t, name: editingTaskName } : t));
        setEditingTaskId(null);
        setEditingTaskName("");
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const cancelEditTask = () => {
    setEditingTaskId(null);
    setEditingTaskName("");
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center text-caramel-600 font-inter text-xl">
        Loading task details...
      </div>
    );
  }

  const completedCount = task.filter(t => t.status === 'completed').length;
  const totalCount = task.length;
  const progressPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-cream-50 p-8 font-inter">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <Link to="/" className="inline-flex items-center text-sm font-medium text-caramel-500 hover:text-brown-900 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        {/* Task Header Card */}
        <div className="bg-cream-100 rounded-3xl p-8 shadow-sm border border-wheat-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-brown-900 mb-3">{name}</h1>
              <p className="text-caramel-800 text-lg max-w-2xl leading-relaxed">{description}</p>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${status === 'Completed' ? 'bg-wheat-300 text-brown-900' : 'bg-wheat-200 text-caramel-800'}`}>
              {status}
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
            {task.length === 0 ? (
              <div className="text-center py-10 bg-cream-50 rounded-2xl border border-dashed border-wheat-300">
                <p className="text-caramel-600 font-medium text-lg">No tasks yet.</p>
                <p className="text-caramel-400 text-sm mt-1">Add your first task below to get started.</p>
              </div>
            ) : (
              task.map(t => (
                <div 
                  key={t.id} 
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 group ${t.status === 'completed' ? 'bg-cream-50 border-wheat-100' : 'bg-white border-wheat-100 hover:border-wheat-300 hover:shadow-sm'}`}
                >
                  <label className="flex items-center cursor-pointer relative shrink-0">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={t.status === 'completed'}
                      onChange={() => toggleTaskCompletion(t.id, t.status)}
                    />
                    <div className={`w-7 h-7 rounded-md border-2 flex items-center justify-center transition-colors ${t.status === 'completed' ? 'bg-caramel-500 border-caramel-500' : 'border-wheat-300 bg-white group-hover:border-caramel-400'}`}>
                      {t.status === 'completed' && (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </label>

                  {editingTaskId === t.id ? (
                    <div className="flex-1 flex gap-2">
                      <input 
                        type="text" 
                        value={editingTaskName} 
                        onChange={(e) => setEditingTaskName(e.target.value)}
                        className="flex-1 bg-white border border-wheat-300 text-brown-900 px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel-400"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEditTask(t.id);
                          if (e.key === 'Escape') cancelEditTask();
                        }}
                      />
                      <button onClick={() => saveEditTask(t.id)} className="px-3 py-1.5 bg-caramel-500 text-white rounded-lg text-sm font-medium hover:bg-caramel-600 transition-colors">Save</button>
                      <button onClick={cancelEditTask} className="px-3 py-1.5 bg-wheat-200 text-caramel-700 rounded-lg text-sm font-medium hover:bg-wheat-300 transition-colors">Cancel</button>
                    </div>
                  ) : (
                    <>
                      <span className={`flex-1 text-[17px] font-medium transition-colors ${t.status === 'completed' ? 'line-through text-caramel-400' : 'text-brown-900'}`}>
                        {t.name}
                      </span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => startEditTask(t)}
                          className="p-1.5 bg-wheat-100 text-blue-600 hover:bg-wheat-200 rounded-md transition-colors"
                          title="Edit Task"
                        >
                          ✎
                        </button>
                        <button 
                          onClick={() => handleDeleteTask(t.id)}
                          className="p-1.5 bg-wheat-100 text-red-600 hover:bg-wheat-200 rounded-md transition-colors"
                          title="Delete Task"
                        >
                          ✕
                        </button>
                      </div>
                    </>
                  )}
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
