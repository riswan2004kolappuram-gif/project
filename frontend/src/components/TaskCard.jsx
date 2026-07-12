import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
 
    <h2 className="text-xl font-bold text-gray-800">
        {task.title}
      </h2>

     
      <p className="text-gray-600 mt-2">
        {task.description}
      </p>

   
      <div className="mt-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>
      </div>

 
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FiEdit2 />
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FiTrash2 />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;