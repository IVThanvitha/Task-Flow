import React, { createContext, useContext, useEffect, useState } from "react";

// ===============================
// TASK TYPE
// ===============================

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate?: string;
}

// ===============================
// CONTEXT TYPE
// ===============================

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

// ===============================
// CREATE CONTEXT
// ===============================

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// ===============================
// PROVIDER
// ===============================

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ===============================
  // ADD TASK
  // ===============================

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  // ===============================
  // TOGGLE COMPLETE
  // ===============================

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // ===============================
  // DELETE TASK
  // ===============================

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// ===============================
// CUSTOM HOOK
// ===============================

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }
  return context;
};


