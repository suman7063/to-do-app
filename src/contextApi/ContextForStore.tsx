import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { Todo, TodoContextType } from "../utils/typeDeclaration";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todo, setTodo] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState<Todo[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const saveToHistory = useCallback(
    (newTodo: Todo[]) => {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), newTodo]);
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const addTodo = useCallback(
    (text: string) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false,
        timestamp: Date.now(),
      };
      const newTodos = [...todo, newTodo];
      setTodo(newTodos);
      saveToHistory(newTodos);
    },
    [todo, saveToHistory]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      const newTodo = todo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodo(newTodo);
      saveToHistory(newTodo);
    },
    [todo, saveToHistory]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      const newTodo = todo.filter((todo) => todo.id !== id);
      setTodo(newTodo);
      saveToHistory(newTodo);
    },
    [todo, saveToHistory]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setTodo(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setTodo(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  return (
    <TodoContext.Provider
      value={{
        todo,
        addTodo,
        toggleTodo,
        deleteTodo,
        undo,
        redo,
        undoStatus: historyIndex > 0,
        redoStatus: historyIndex < history.length - 1,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
