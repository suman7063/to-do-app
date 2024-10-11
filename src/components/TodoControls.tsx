import React from "react";
import { FilterType } from "../utils/typeDeclaration";
import { useTasks } from "../contextApi/ContextForStore";
import SearchIcon from "../icons/SearchIcon";
import RedoIcon from "../icons/RedoIcon";
import UndoIcon from "../icons/UndoIcon";

const filterItem: FilterType[] = ["all", "completed", "incomplete"];

const TodoControls = ({
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
}: {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) => {
  const context = useTasks();
  if (!context) throw new Error("TaskContext must be used within TaskProvider");
  const {undo, redo } = context;



  return (
    <div className="space-y-4">
      <div className="md:flex justify-between">
        <div className="relative md:max-w-[500px] w-full h-[40px]">
          <SearchIcon />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-[100px] border border-gray-200 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-between mt-4 md:mt-0">
          <div className="flex gap-2">
            {filterItem.map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  filter === filterType
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={undo}
              className="p-2 text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
             <UndoIcon/>
            </button>
            <button
              onClick={redo}
              className="p-2 text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RedoIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoControls;
