
import { useTasks } from "../context/TaskContext";
import { generateTaskSuggestions } from "../utils/aiSuggestions";

const AISuggestions = () => {

  const { tasks } = useTasks();
  const suggestions = generateTaskSuggestions(tasks);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 shadow-sm">

      <h2 className="text-lg font-semibold mb-3 text-neutral-900 dark:text-white">
        AI Productivity Suggestions
      </h2>

      <ul className="space-y-2">
        {suggestions.map((s, i) => (
          <li
            key={i}
            className="text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded-md"
          >
            {s}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AISuggestions;
