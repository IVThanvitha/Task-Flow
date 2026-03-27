import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTasks } from "../context/TaskContext";

const WeeklyProductivityChart = () => {
  const { tasks } = useTasks();

  // Days of week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Count completed tasks per day
  const data = days.map((day, index) => {
    const count = tasks.filter((task) => {
      if (!task.completed || !task.dueDate) return false;

      const date = new Date(task.dueDate);
      return date.getDay() === index;
    }).length;

    return {
      day,
      completed: count,
    };
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-neutral-200 mt-10">
      <h2 className="text-lg font-semibold mb-4">
        Weekly Productivity
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#6366f1"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyProductivityChart;