import { useState } from "react";
import { useTasks } from "../context/TaskContext";

interface AddTaskModalProps {
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose }) => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    addTask({
      id: Date.now().toString(),
      title,
      description,
      priority,
      dueDate,
      completed: false,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Add New Task
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-800 text-white rounded-lg outline-none"
        />

        {/* Description */}
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-800 text-white rounded-lg outline-none"
        />

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "High" | "Medium" | "Low")
          }
          className="w-full p-3 mb-4 bg-slate-800 text-white rounded-lg outline-none"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 mb-6 bg-slate-800 text-white rounded-lg outline-none"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
