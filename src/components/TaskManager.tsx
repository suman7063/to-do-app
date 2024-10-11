import React, { useState } from "react";
import { FilterType } from "../utils/typeDeclaration";
import useDebounce from "../customHook/useDebounce";
import TaskControls from "./TaskControls";
import TaskList from "./TaskList";
const TaskManager = () => {
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  return (
    <div className="p-6">
      <TaskControls
        newTask={newTask}
        setNewTask={setNewTask}
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TaskList filter={filter} searchTerm={debouncedSearch} />
    </div>
  );
};

export default TaskManager;
