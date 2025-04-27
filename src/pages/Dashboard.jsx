import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { doSignOut } from "../firebase/auth";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("To Do");

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/login", { replace: true });
    } catch (error) {
      alert("Logout failed! Please try again.");
      console.error("Logout error:", error);
    }
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim() || !newTaskDesc.trim()) {
      alert("Please fill both Task Title and Description before adding.");
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDesc,
      status: newTaskStatus,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskStatus("To Do");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditStart = (task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditStatus(task.status);
  };

  const handleEditSave = () => {
    if (!editTitle.trim() || !editDesc.trim()) {
      alert("Please fill all fields before saving.");
      return;
    }
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId
          ? { ...task, title: editTitle, description: editDesc, status: editStatus }
          : task
      )
    );
    setEditTaskId(null);
    setEditTitle("");
    setEditDesc("");
    setEditStatus("");
  };

  const handleEditCancel = () => {
    setEditTaskId(null);
    setEditTitle("");
    setEditDesc("");
    setEditStatus("");
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <div className="min-h-screen bg-purple-300 text-gray-900 flex flex-row">
      {/* Sidebar */}
      <div className="w-64 bg-purple-900 text-white flex flex-col p-6 space-y-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <button className="text-left hover:bg-gray-600 px-4 py-2 rounded">Home</button>
          <button className="text-left hover:bg-gray-600 px-4 py-2 rounded">Tasks</button>
          <button className="text-left hover:bg-gray-600 px-4 py-2 rounded">Profile</button>
          <button onClick={handleLogout} className="text-left hover:bg-red-600 px-4 py-2 rounded">Logout</button>
        </nav>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 flex flex-col">
        <div className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto p-8 md:p-16 w-full">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight tracking-wide text-indigo-900 drop-shadow-sm">
              Welcome to Your Task Management Dashboard
            </h1>
            <p className="text-lg text-indigo-700 max-w-md drop-shadow-sm">
              Manage your account, track your activities, and explore new features in one place.
            </p>
          </div>
          <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center">
            <img src="img3-removebg-preview.png" alt="Dashboard Illustration" />
          </div>
        </div>

        {/* Task Manager */}
        <div className="w-full mx-auto p-8 bg-white rounded-2xl shadow-xl text-gray-900 mt-12 mb-12 px-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-indigo-900 tracking-wide">
            Task Manager Dashboard
          </h1>

          {/* Add Task Form */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Task Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Task Description"
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <button
              onClick={handleAddTask}
              className="px-6 py-3 bg-purple-300 text-white rounded-md hover:bg-purple-600 transition duration-300"
            >
              Add Task
            </button>
          </div>

          {/* Tasks List */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {tasks.length === 0 && (
                    <p className="text-center text-gray-500">No tasks yet.</p>
                  )}
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white p-5 rounded shadow-md flex flex-col md:flex-row md:items-center justify-between transition-shadow ${
                            snapshot.isDragging ? "shadow-lg" : "shadow-md"
                          }`}
                        >
                          {editTaskId === task.id ? (
                            <div className="flex-1 flex flex-col gap-2">
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                              <input
                                type="text"
                                value={editDesc}
                                onChange={(e) => setEditDesc(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                              <select
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                              </select>
                            </div>
                          ) : (
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-indigo-700">{task.title}</h3>
                              <p className="text-gray-600">{task.description}</p>
                              <p className="text-sm text-gray-500 mt-2">
                                Status: <span className="font-semibold">{task.status}</span>
                              </p>
                            </div>
                          )}

                          <div className="flex gap-3 mt-4 md:mt-0 md:ml-6">
                            {editTaskId === task.id ? (
                              <>
                                <button
                                  onClick={handleEditSave}
                                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleEditCancel}
                                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEditStart(task)}
                                  className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(task.id)}
                                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
