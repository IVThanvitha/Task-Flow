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
  status?: "todo" | "inprogress" | "done";
}

// ===============================
// CONTEXT TYPE
// ===============================

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, toggleTask, deleteTask }}
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



