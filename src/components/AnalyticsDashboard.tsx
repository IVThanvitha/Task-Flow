import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { useTasks } from "../context/TaskContext";

const AnalyticsDashboard = () => {
  const { tasks } = useTasks();

  // Task completion stats
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.filter((task) => !task.completed).length;

  const statusData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  // Priority stats
  const high = tasks.filter((task) => task.priority === "High").length;
  const medium = tasks.filter((task) => task.priority === "Medium").length;
  const low = tasks.filter((task) => task.priority === "Low").length;

  const priorityData = [
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10">
      
      {/* Task Completion Chart */}

      <div className="bg-white p-6 rounded-xl shadow border border-neutral-200">
        <h2 className="text-lg font-semibold mb-4">
          Task Completion
        </h2>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
              fill="#22c55e"
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Priority Chart */}

      <div className="bg-white p-6 rounded-xl shadow border border-neutral-200">
        <h2 className="text-lg font-semibold mb-4">
          Tasks by Priority
        </h2>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={priorityData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
              fill="#3b82f6"
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;