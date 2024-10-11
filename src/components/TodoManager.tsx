import React, { useState } from "react";
import { FilterType } from "../utils/typeDeclaration";
import useDebounce from "../customHook/useDebounce";
import TodoControls from "./TodoControls";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
const TodoManager = () => {
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  return (
    <>
     <h1 className="w-full text-center text-xl mt-4 ">To-do List</h1>
    <div className="max-w-[1000px] w-[95%] md:w-full m-auto my-8">
     
      <TodoControls
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TodoList filter={filter} searchTerm={debouncedSearch} />
      <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} />
    </div>
    </>
  );
};

export default TodoManager;
