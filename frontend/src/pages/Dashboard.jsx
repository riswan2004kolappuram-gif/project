 import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  // Add Task
  const handleAddTask = (newTask) => {
    setTasks([
      ...tasks,
      {
        _id: Date.now(),
        ...newTask,
      },
    ]);
  };

  // Edit Button Click
  const handleEdit = (task) => {
    setEditTask(task);
  };

  // Update Task
  const handleUpdateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );

    setEditTask(null);
  };

  // Delete Task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));

    if (editTask && editTask._id === id) {
      setEditTask(null);
    }
  };

  // Stats
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

          {/* Form & Tasks */}
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