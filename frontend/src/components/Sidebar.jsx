import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiPlusCircle,
  FiSettings,
  FiLogOut,
  FiX,
} from "react-icons/fi";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo & Close Button */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-indigo-400">
            Task Manager
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden text-2xl text-slate-400 hover:text-white cursor-pointer"
          >
            <FiX />
          </button>
        </div>
 
        <nav className="flex-1 p-5">
          <ul className="space-y-3">

            <li>
              <Link
                to="/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
              >
                <FiHome size={20} />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onClose(); }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
              >
                <FiCheckSquare size={20} />
                <span>My Tasks</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onClose(); }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
              >
                <FiPlusCircle size={20} />
                <span>Add Task</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onClose(); }}
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
    </>
  );
};

export default Sidebar;