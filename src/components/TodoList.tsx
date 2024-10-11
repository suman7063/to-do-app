import React from "react";
import { FilterType } from "../utils/typeDeclaration";
import { useTodoContext } from "../contextApi/ContextForStore";
import GreenCheckIcon from "../icons/GreenCheckIcon";

const TodoList = ({
  filter,
  searchTerm,
}: {
  filter: FilterType;
  searchTerm: string;
}) => {
  const { todo, toggleTodo, deleteTodo } = useTodoContext();

  const filteredTodo = todo
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  if (filteredTodo.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 my-16 rounded-md border border-red-200 border-dashed ">
        No Item found
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-16">
      {filteredTodo.map((todo) => (
        <div
          key={todo.id}
          className={`flex items-center gap-4 p-4 border-2 ${
            todo.completed
              ? "bg-green-100 border-green-300"
              : "bg-gray-50  border-gray-300 "
          } rounded-lg`}
        >
          {todo.completed ? (
            <div
              className="w-5 h-5 border-2 border-green-300 rounded-full"
              onClick={() => toggleTodo(todo.id)}
            >
               <GreenCheckIcon />
            </div>
          ) : (
            <div
              className="w-5 h-5 border-2 border-gray-300 rounded-full"
              onClick={() => toggleTodo(todo.id)}
            />
          )}

          <span
            className={`flex-grow ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-1 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 rounded-md"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
