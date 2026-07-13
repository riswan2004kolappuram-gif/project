import React, { useEffect, useState } from "react";
import {FiMenu,FiMoon,FiBell, FiUser,} from "react-icons/fi";

export default function Navbar({ onMenuClick }) {
  const [userName, setUserName] = useState("Riswan KT");

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && user.name) {
          setUserName(user.name);
        }
      }
    } catch (err) {
      console.error("Failed to load user info from localStorage", err);
    }
  }, []);

  return (
    <div className="w-full h-20 bg-white shadow-sm flex items-center justify-between px-4 md:px-8">

      {/* Left */}
      <div className="flex items-center gap-3 md:gap-5">
        <button 
          onClick={onMenuClick}
          className="text-3xl text-gray-700 hover:text-indigo-600 lg:hidden cursor-pointer"
        >
          <FiMenu />
        </button>

        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 text-xs md:text-sm hidden sm:block">
            Manage your daily tasks efficiently
          </p>
        </div>
      </div>
 
      <div className="flex items-center gap-6">

   
        <button className="text-2xl text-gray-600 hover:text-indigo-600">
          <FiMoon />
        </button>
 
        <button className="relative text-2xl text-gray-600 hover:text-indigo-600">
          <FiBell />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>
 
        <div className="flex items-center gap-3 cursor-pointer">

          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl">
            <FiUser />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">
              {userName}
            </h2>

            <p className="text-sm text-gray-500">
              Admin
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}