import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await axios.get("https://project-zviw.onrender.com/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Make sure tasks is an array
        setTasks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [navigate, token]);
 
  const handleAddTask = async (newTask) => {
    try {
      const res = await axios.post(
        "https://project-zviw.onrender.com/api/tasks",
        newTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.task) {
        setTasks([...tasks, res.data.task]);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create task");
    }
  };
 
  const handleEdit = (task) => {
    setEditTask(task);
  };
 
  const handleUpdateTask = async (updatedTask) => {
    try {
      const res = await axios.put(
        `https://project-zviw.onrender.com/api/tasks/${updatedTask._id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.updatedTask) {
        setTasks(
          tasks.map((task) =>
            task._id === updatedTask._id ? res.data.updatedTask : task
          )
        );
      }
      setEditTask(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update task");
    }
  };
 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://project-zviw.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));

      if (editTask && editTask._id === id) {
        setEditTask(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };
 
  const total = tasks.length;
  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <StatsCard
              title="Total Tasks"
              count={total}
              color="text-blue-600"
            />

            <StatsCard
              title="Pending"
              count={pending}
              color="text-yellow-500"
            />

            <StatsCard
              title="In Progress"
              count={progress}
              color="text-indigo-600"
            />

            <StatsCard
              title="Completed"
              count={completed}
              color="text-green-600"
            />

          </div>

 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            <div>

              <TaskForm
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                editTask={editTask}
              />

            </div>

            <div className="lg:col-span-2">

              <h2 className="text-2xl font-bold mb-5">
                My Tasks
              </h2>

              {tasks.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                  No Tasks Available
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;