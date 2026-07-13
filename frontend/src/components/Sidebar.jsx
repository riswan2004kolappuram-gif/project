import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiPlusCircle,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold text-indigo-400">
          Task Manager
        </h1>
      </div>
 
      <nav className="flex-1 p-5">
        <ul className="space-y-3">

          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
            >
              <FiHome size={20} />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
            >
              <FiCheckSquare size={20} />
              <span>My Tasks</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
            >
              <FiPlusCircle size={20} />
              <span>Add Task</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
            >
              <FiSettings size={20} />
              <span>Settings</span>
            </a>
          </li>

        </ul>
      </nav>

     
      <div className="p-5 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;