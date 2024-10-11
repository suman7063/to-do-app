import React from "react";
import { FilterType } from "../utils/typeDeclaration";
import { useTasks } from "../contextApi/ContextForStore";

const TaskList = ({ filter, searchTerm }: { filter: FilterType; searchTerm: string }) => {
  const context = useTasks();
  if (!context) throw new Error('TaskContext must be used within TaskProvider');
  const { tasks, toggleTask, deleteTask } = context;

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    })
    .filter(task =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-4">
      {filteredTasks.map(task => (
        <div
          key={task.id}
          className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.text}
          </span>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList