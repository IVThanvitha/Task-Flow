
import { useTasks } from "../context/TaskContext";
import { generateDailyPlan } from "../utils/aiPlanner";

const AIDailyPlanner = () => {

  const { tasks } = useTasks();

  const plan = generateDailyPlan(tasks);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 shadow-sm">

      <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
        AI Daily Planner
      </h2>

      {plan.length === 0 ? (
        <p className="text-sm text-neutral-500">
          Add tasks to generate your daily plan.
        </p>
      ) : (
        <div className="space-y-3">

          {plan.map((p, i) => (

            <div
              key={i}
              className="flex justify-between items-center bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded-md"
            >

              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {p.title}
              </span>

              <span className="text-xs text-neutral-500">
                {p.time}
              </span>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default AIDailyPlanner;
