import React, { useEffect, useState } from "react";

const TaskForm = ({ onAddTask, onUpdateTask, editTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  useEffect(() => {
    if (editTask) {
      setTask(editTask);
    }
  }, [editTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title || !task.description) {
      alert("Please fill all fields");
      return;
    }

    if (editTask) {
      onUpdateTask(task);
    } else {
      onAddTask(task);
    }

    setTask({
      title: "",
      description: "",
      status: "Pending",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-5">
        {editTask ? "Update Task" : "Add New Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            value={task.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          {editTask ? "Update Task" : "Add Task"}
        </button>

      </form>
    </div>
  );
};

export default TaskForm;