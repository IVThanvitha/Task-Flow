import { useMemo } from "react";
import { useTasks } from "../context/TaskContext";

const AnalyticsDashboard = () => {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const mediumPriority = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const lowPriority = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      !task.completed
  ).length;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">
        📊 Performance Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <StatCard title="Total" value={totalTasks} />
        <StatCard title="Completed" value={completedTasks} />
        <StatCard title="Pending" value={pendingTasks} />
        <StatCard title="Completion %" value={`${completionRate}%`} />
        <StatCard title="High Priority" value={highPriority} />
        <StatCard title="Overdue" value={overdueTasks} />
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl mt-10 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          Priority Distribution
        </h3>

        <ProgressBar label="High" value={highPriority} total={totalTasks} color="bg-red-500" />
        <ProgressBar label="Medium" value={mediumPriority} total={totalTasks} color="bg-yellow-500" />
        <ProgressBar label="Low" value={lowPriority} total={totalTasks} color="bg-green-500" />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

// ------------------
// Reusable Components
// ------------------

const StatCard = ({ title, value }: { title: string; value: any }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

const ProgressBar = ({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) => {
  const percentage =
    total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-3">
        <div
          className={`${color} h-3 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
