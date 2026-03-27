

import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import CalendarView from "../components/CalendarView";
import WeeklyProductivityChart from "../components/WeeklyProductivityChart";
import KanbanBoard from "../components/KanbanBoard";
import DarkModeToggle from "../components/DarkModeToggle";
import { AnimatePresence } from "framer-motion";
import AISuggestions from "../components/AISuggestions";
import AIDailyPlanner from "../components/AIDailyPlanner";

type FilterType = "all" | "pending" | "completed" | "high";
type SortType = "newest" | "priority" | "due";

const Dashboard = () => {
  const { tasks } = useTasks();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("newest");

  // ======================
  // STATS
  // ======================

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const highPriorityTasks = tasks.filter(
    (t) => t.priority === "High"
  ).length;

  // ======================
  // FILTER + SEARCH
  // ======================

  let processedTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "pending"
        ? !task.completed
        : filter === "completed"
        ? task.completed
        : task.priority === "High";

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // ======================
  // SORT
  // ======================

  processedTasks = [...processedTasks].sort((a, b) => {
    if (sort === "priority") {
      const order: Record<string, number> = {
        High: 1,
        Medium: 2,
        Low: 3,
      };
      return order[a.priority] - order[b.priority];
    }

    if (sort === "due") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return (
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
      );
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">

      {/* HEADER */}

      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            TaskFlow Pro
          </h1>

          <div className="flex items-center gap-3">

            <DarkModeToggle />

            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800"
            >
              + New Task
            </button>

          </div>

        </div>
      </header>

      {/* MAIN */}

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <StatCard title="Total Tasks" value={totalTasks} />
          <StatCard title="Completed" value={completedTasks} />
          <StatCard title="Pending" value={pendingTasks} />
          <StatCard title="High Priority" value={highPriorityTasks} />

        </div>

        <AISuggestions />
        <AIDailyPlanner />

        {/* TASK + ANALYTICS */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* TASK LIST */}

          <div className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">

            <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">
              Your Tasks
            </h2>

            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white rounded-lg px-4 py-2 mb-4"
            />

            {/* FILTERS */}

            <div className="flex gap-2 flex-wrap mb-4">

              <FilterButton
                label="All"
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />

              <FilterButton
                label="Pending"
                active={filter === "pending"}
                onClick={() => setFilter("pending")}
              />

              <FilterButton
                label="Completed"
                active={filter === "completed"}
                onClick={() => setFilter("completed")}
              />

              <FilterButton
                label="High"
                active={filter === "high"}
                onClick={() => setFilter("high")}
              />

            </div>

            {/* SORT */}

            <div className="flex items-center gap-3 mb-6">

              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Sort:
              </span>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value as SortType)
                }
                className="border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white rounded-lg px-3 py-1 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="priority">Priority</option>
                <option value="due">Due Date</option>
              </select>

            </div>

            {/* TASK LIST */}

            {processedTasks.length === 0 ? (
              <p className="text-neutral-500 text-sm">
                No tasks found.
              </p>
            ) : (
              <div className="space-y-4">

                <AnimatePresence>

                  {processedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}

                </AnimatePresence>

              </div>
            )}

          </div>

          {/* ANALYTICS */}

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">

            <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">
              Analytics Overview
            </h2>

            <AnalyticsDashboard />

          </div>

        </div>

        {/* CALENDAR */}

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
          <CalendarView />
        </div>

        {/* WEEKLY PRODUCTIVITY */}

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
          <WeeklyProductivityChart />
        </div>

        {/* KANBAN */}

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
          <KanbanBoard />
        </div>

      </main>

      {open && <AddTaskModal onClose={() => setOpen(false)} />}

    </div>
  );
};

export default Dashboard;

/* FILTER BUTTON */

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton = ({
  label,
  active,
  onClick,
}: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-md border transition ${
        active
          ? "bg-black text-white border-black"
          : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
      }`}
    >
      {label}
    </button>
  );
};

/* STAT CARD */

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 shadow-sm">

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {title}
      </p>

      <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
        {value}
      </p>

    </div>
  );
};



