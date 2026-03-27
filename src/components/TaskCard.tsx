import { motion } from "framer-motion";
import { useState } from "react";
import type { Task } from "../context/TaskContext";
import { useTasks } from "../context/TaskContext";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const { toggleTask, deleteTask } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const saveEdit = () => {
    task.title = title;
    task.description = description;
    setIsEditing(false);
  };

  const priorityStyles = {
    High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800",
    Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800",
    Low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
  };

  const priorityColor = task.priority as keyof typeof priorityStyles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            className="w-full border border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-2 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            autoFocus
          />

          <textarea
            className="w-full border border-neutral-300 dark:border-neutral-600 rounded-md px-3 py-2 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description (optional)"
            rows={3}
          />

          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              Save Changes
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 rounded-md text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          {/* LEFT CONTENT */}
          <div className="flex-1 w-full sm:w-auto">
            <h3
              className={`text-lg font-semibold text-neutral-900 dark:text-white ${
                task.completed ? "line-through opacity-60" : ""
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className={`text-sm text-neutral-600 dark:text-neutral-400 mt-1 ${
                task.completed ? "opacity-60" : ""
              }`}>
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span
                className={`text-xs px-2 py-1 rounded-md font-medium ${priorityStyles[priorityColor]}`}
              >
                {task.priority}
              </span>

              {task.dueDate && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  Due: {task.dueDate}
                </span>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 text-neutral-700 dark:text-neutral-300 font-medium transition-all"
              title="Edit task"
            >
              Edit
            </button>

            <button
              onClick={() => toggleTask(task.id)}
              className={`text-sm px-3 py-1.5 rounded-md font-medium transition-all ${
                task.completed 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              title={task.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {task.completed ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-sm px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
              title="Delete task"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
