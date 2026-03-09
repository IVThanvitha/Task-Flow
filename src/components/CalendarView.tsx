import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const CalendarView = () => {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const tasksForSelectedDate = tasks.filter(
    (task) => task.dueDate === selectedDate
  );

  return (
    <div className="bg-slate-900 p-6 rounded-2xl mt-10">
      <h2 className="text-lg font-semibold mb-4">
        Calendar View
      </h2>

      {/* Simple Date Picker */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="p-3 bg-slate-800 rounded-lg"
      />

      <div className="mt-6">
        <h3 className="font-semibold">
          Tasks for {selectedDate}
        </h3>

        {tasksForSelectedDate.length === 0 ? (
          <p className="text-slate-500 mt-2">
            No tasks scheduled.
          </p>
        ) : (
          tasksForSelectedDate.map((task) => (
            <div
              key={task.id}
              className="mt-2 p-3 bg-slate-800 rounded-lg"
            >
              {task.title} ({task.priority})
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarView;
