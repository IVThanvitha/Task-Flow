import { useTasks } from "../context/TaskContext";

const WeeklyView = () => {
  const { tasks } = useTasks();

  const today = new Date();
  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  return (
    <div className="bg-slate-900 p-6 rounded-2xl mt-10">
      <h2 className="text-lg font-semibold mb-4">Next 7 Days</h2>

      {next7Days.map((date) => {
        const dayTasks = tasks.filter(
          (task) => task.dueDate === date
        );

        return (
          <div key={date} className="mb-4">
            <h3 className="text-indigo-400">{date}</h3>
            {dayTasks.length === 0 ? (
              <p className="text-slate-500 text-sm">No tasks</p>
            ) : (
              dayTasks.map((task) => (
                <p key={task.id} className="text-sm">
                  • {task.title}
                </p>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyView;
