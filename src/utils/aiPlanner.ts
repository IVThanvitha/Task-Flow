
import type { Task } from "../context/TaskContext";

export interface PlannedTask {
  time: string;
  title: string;
}

export const generateDailyPlan = (tasks: Task[]): PlannedTask[] => {

  const incompleteTasks = tasks
    .filter(t => !t.completed)
    .sort((a, b) => {

      const priorityOrder = { High: 1, Medium: 2, Low: 3 };

      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const startHour = 9;
  const planned: PlannedTask[] = [];

  incompleteTasks.slice(0,5).forEach((task, index) => {

    const hour = startHour + index * 2;

    planned.push({
      time: `${hour}:00`,
      title: task.title
    });

  });

  return planned;
};
