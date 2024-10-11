import React, { useState } from "react";
import { FilterType } from "../utils/typeDeclaration";
import useDebounce from "../customHook/useDebounce";
import TaskControls from "./TaskControls";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
const TaskManager = () => {
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  return (
    <div className="max-w-[1200px] w-11/12 m-auto my-16">
      <TaskControls
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TaskList filter={filter} searchTerm={debouncedSearch} />
      <AddTask newTask={newTask} setNewTask={setNewTask} />
    </div>
  );
};

export default TaskManager;
