import { useTodoContext } from "../contextApi/ContextForStore";
import PlusIcon from "../icons/PlusIcon";

const AddTodo = ({
  newTodo,
  setNewTodo,
}: {
  newTodo: string;
  setNewTodo: (value: string) => void;
})=>{
  const { addTodo} = useTodoContext();

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  return(
    <form onSubmit={handleAddItem} className="mt-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Please Add New Item..."
          className="flex-grow w-full rounded-md border border-gray-200 px-3 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!newTodo.trim()}
          className="inline-flex  w-full h-11 mt-4 items-center justify-center text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon/>
          Add
        </button>
      </form>
  )
}

export default AddTodo