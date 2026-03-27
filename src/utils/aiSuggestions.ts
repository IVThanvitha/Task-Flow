
import type { Task } from "../context/TaskContext";

export const generateTaskSuggestions = (tasks: Task[]): string[] => {

  const suggestions: string[] = [];

  if (tasks.length === 0) {
    suggestions.push("Start by adding your first task");
    suggestions.push("Plan your top 3 priorities for today");
    return suggestions;
  }

  const highPriority = tasks.filter(t => t.priority === "High");
  const incomplete = tasks.filter(t => !t.completed);

  if (highPriority.length > 3) {
    suggestions.push("You have many high priority tasks. Consider breaking them into smaller tasks.");
  }

  if (incomplete.length > 5) {
    suggestions.push("You have several unfinished tasks. Focus on completing 2 tasks today.");
  }

  if (tasks.some(t => t.title.toLowerCase().includes("study"))) {
    suggestions.push("Try using the Pomodoro technique for study tasks.");
  }

  if (tasks.some(t => t.title.toLowerCase().includes("project"))) {
    suggestions.push("Break your project into milestones for better progress tracking.");
  }

  suggestions.push("Schedule time blocks for your most important tasks.");

  return suggestions.slice(0,3);
};
