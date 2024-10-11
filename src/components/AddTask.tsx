import { useTasks } from "../contextApi/ContextForStore";
import PlusIcon from "../icons/PlusIcon";

const AddTask = ({
  newTask,
  setNewTask,
}: {
  newTask: string;
  setNewTask: (value: string) => void;
})=>{

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
    }
  };
  const { addTask} = useTasks();
  return(
    <form onSubmit={handleAddItem} className="mt-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow w-full rounded-md border border-gray-200 px-3 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!newTask.trim()}
          className="inline-flex  w-full h-11 mt-4 items-center justify-center text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon/>
          Add
        </button>
      </form>
  )
}

export default AddTask