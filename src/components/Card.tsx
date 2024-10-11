import React from "react";

const Card = ({
  task,
}: {
  task: {
    id: string;
    text: string;
    completed: boolean;
    timestamp: number;
  };
}) => {
  return (
    <div
      key={task.id}
      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
    >
      <input
        type="checkbox"
        checked={task.completed}
        // onChange={() => toggleTask(task.id)}
        className="w-4 h-4"
      />
      <span
        className={`flex-grow ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.text}
      </span>
      <button
        // onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700"
      >
       X
      </button>
    </div>
  );
};

export default Card