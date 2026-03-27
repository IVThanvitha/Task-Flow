import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTasks } from "../context/TaskContext";

const CalendarView = () => {
  const { tasks } = useTasks();
  const [date, setDate] = useState(new Date());

  const selectedDate = date.toISOString().split("T")[0];

  const tasksForDay = tasks.filter(
    (task) => task.dueDate === selectedDate
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-neutral-200 mt-10">

      <h2 className="text-lg font-semibold mb-4">
        Task Calendar
      </h2>

      <Calendar onChange={(value: any) => setDate(value)} value={date} />

      <div className="mt-6">

        <h3 className="font-medium mb-2">
          Tasks on {selectedDate}
        </h3>

        {tasksForDay.length === 0 && (
          <p className="text-sm text-neutral-500">
            No tasks scheduled
          </p>
        )}

        {tasksForDay.map((task) => (
          <div
            key={task.id}
            className="p-3 border rounded-lg mb-2"
          >
            {task.title}
          </div>
        ))}

      </div>
    </div>
  );
};

export default CalendarView;
