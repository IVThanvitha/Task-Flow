import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";

const columns = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Completed",
};

const KanbanBoard = () => {
  const { tasks, updateTask } = useTasks();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    updateTask({
      ...task,
      status: newStatus,
      completed: newStatus === "done",
    });
  };

  // Get priority color for task items
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "High":
        return "border-l-4 border-l-red-500";
      case "Medium":
        return "border-l-4 border-l-yellow-500";
      case "Low":
        return "border-l-4 border-l-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="mt-12">
      {/* Enhanced Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">
          Kanban Workflow
        </h2>
        <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
          Drag & Drop
        </span>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-3 gap-6">

          {Object.entries(columns).map(([status, title]) => {
            const columnTasks = tasks.filter(
              (task) => (task.status || "todo") === status
            );

            // Column-specific styles
            const columnStyles = {
              todo: "border-t-4 border-t-blue-500",
              inprogress: "border-t-4 border-t-yellow-500",
              done: "border-t-4 border-t-green-500",
            };

            const columnColor = status as keyof typeof columnStyles;

            return (
              <Droppable droppableId={status} key={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm min-h-[200px] transition-all ${
                      columnStyles[columnColor]
                    } ${
                      snapshot.isDraggingOver 
                        ? "bg-neutral-50 dark:bg-neutral-800 ring-2 ring-blue-400 dark:ring-blue-600" 
                        : ""
                    }`}
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-neutral-800 dark:text-white flex items-center gap-2">
                        {title}
                        <span className="text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                          {columnTasks.length}
                        </span>
                      </h3>
                      {status === "done" && columnTasks.length > 0 && (
                        <span className="text-xs text-green-600 dark:text-green-400">
                          ✓ Completed
                        </span>
                      )}
                    </div>

                    {/* Tasks */}
                    {columnTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-gray-100 dark:bg-neutral-800 p-3 rounded-lg mb-3 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all ${
                              getPriorityColor(task.priority)
                            } ${
                              snapshot.isDragging 
                                ? "shadow-lg rotate-1 scale-105 bg-blue-50 dark:bg-blue-900/20" 
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-neutral-800 dark:text-white">
                                {task.title}
                              </span>
                              {task.priority && (
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  task.priority === "High" 
                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" 
                                    : task.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                }`}>
                                  {task.priority}
                                </span>
                              )}
                            </div>
                            {task.dueDate && (
                              <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                                <span>📅</span>
                                {task.dueDate}
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                    
                    {/* Empty state */}
                    {columnTasks.length === 0 && (
                      <div className="text-center py-8 text-neutral-400 dark:text-neutral-600 text-sm border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg">
                        Drop tasks here
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            );
          })}

        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;