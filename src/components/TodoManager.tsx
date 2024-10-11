import React, { useState } from "react";
import { FilterType } from "../utils/typeDeclaration";
import useDebounce from "../customHook/useDebounce";
import TodoControls from "./TodoControls";
import AddTask from "./AddTask";
import TodoList from "./TodoList";
const TodoManager = () => {
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  return (
    <div className="max-w-[1000px] w-[95%] md:w-full m-auto my-16">
      <TodoControls
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TodoList filter={filter} searchTerm={debouncedSearch} />
      <AddTask newTask={newTask} setNewTask={setNewTask} />
    </div>
  );
};

export default TodoManager;
