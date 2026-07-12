import React from "react";

const StatsCard = ({ title, count, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {count}
      </h2>
    </div>
  );
};

export default StatsCard;
