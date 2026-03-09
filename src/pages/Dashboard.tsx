import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import AnalyticsDashboard from "../components/AnalyticsDashboard";

const Dashboard = () => {
  const { tasks } = useTasks();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Company Task Manager</h1>
          <p className="text-slate-400 mt-2">
            Enterprise Productivity Dashboard
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          + Add Task
        </button>
      </div>

      {/* Analytics */}
      <AnalyticsDashboard />

      {/* Task List */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Active Tasks
        </h2>

        {tasks.length === 0 ? (
          <div className="bg-slate-900 p-6 rounded-xl text-slate-400">
            No tasks available. Add one to begin.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <AddTaskModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
