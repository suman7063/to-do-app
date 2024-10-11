import React,{useState,} from "react";
import { FilterType } from "../utils/typeDeclaration";
import useDebounce from "../customHook/useDebounce";
const TaskManager = () => {
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  return (
    // <TaskProvider>
    //   <div className="max-w-4xl mx-auto p-4">
    //     <Card className="mb-8">
    //       <CardHeader>
    //         <CardTitle>Task Manager</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <TaskControls
    //           newTask={newTask}
    //           setNewTask={setNewTask}
    //           filter={filter}
    //           setFilter={setFilter}
    //           searchTerm={searchTerm}
    //           setSearchTerm={setSearchTerm}
    //         />
    //         <TaskList filter={filter} searchTerm={debouncedSearch} />
    //       </CardContent>
    //     </Card>
    //   </div>
    // </TaskProvider>
    <p></p>
  );
};