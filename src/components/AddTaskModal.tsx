import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import type { Task } from "../context/TaskContext";

interface Props {
  onClose: () => void;
  existingTask?: Task;
}

const AddTaskModal = ({ onClose, existingTask }: Props) => {
  const { addTask, updateTask } = useTasks();

  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(existingTask?.description || "");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">(
    existingTask?.priority || "Medium"
  );
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || "");

  const handleSubmit = () => {
    if (!title.trim()) return;

    const task: Task = {
      id: existingTask?.id || Date.now().toString(),
      title,
      description,
      priority,
      dueDate,
      completed: existingTask?.completed || false,
    };

    if (existingTask) {
      updateTask(task);
    } else {
      addTask(task);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-96 space-y-4">

        <h2 className="text-lg font-semibold">
          {existingTask ? "Edit Task" : "Add Task"}
        </h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-neutral-300 rounded-lg px-3 py-2"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-neutral-300 rounded-lg px-3 py-2"
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "High" | "Medium" | "Low")
          }
          className="w-full border border-neutral-300 rounded-lg px-3 py-2"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border border-neutral-300 rounded-lg px-3 py-2"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-3 py-1 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-black text-white rounded-lg"
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;