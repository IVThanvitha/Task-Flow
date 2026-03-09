import type { Task } from "../context/TaskContext";
import { useTasks } from "../context/TaskContext";


interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useTasks();

  const priorityColor =
    task.priority === "High"
      ? "bg-red-500"
      : task.priority === "Medium"
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <div className="flex justify-between items-start">
        <h3
          className={`text-lg font-semibold ${
            task.completed ? "line-through text-slate-500" : ""
          }`}
        >
          {task.title}
        </h3>

        <span
          className={`text-xs px-3 py-1 rounded-full text-white ${priorityColor}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-slate-400 mt-3 text-sm">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <p className="text-slate-500 mt-3 text-sm">
          📅 Due: {task.dueDate}
        </p>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => toggleTask(task.id)}
          className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition text-sm"
        >
          {task.completed ? "Mark Pending" : "Mark Complete"}
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
