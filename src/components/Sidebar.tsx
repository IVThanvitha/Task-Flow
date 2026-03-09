import { FaTasks, FaChartPie } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 p-6 shadow-2xl border-r border-slate-800">
      <h2 className="text-2xl font-bold text-indigo-500 mb-10">
        TaskFlow-Pro
      </h2>

      <ul className="space-y-6 text-slate-300">
        <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer transition-all">
          <FaTasks /> Tasks
        </li>
        <li className="flex items-center gap-3 hover:text-indigo-400 cursor-pointer transition-all">
          <FaChartPie /> Analytics
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
