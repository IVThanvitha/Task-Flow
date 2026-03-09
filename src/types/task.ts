export type Status = "Todo" | "In Progress" | "Review" | "Completed";

export interface Task {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  status: Status;
  assignedTo: string;
  department: string;
}

