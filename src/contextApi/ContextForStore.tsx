import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { Task, TaskContextType } from "../utils/typeDeclaration";

// create Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider
export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState<Task[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save tasks to history
  const saveToHistory = useCallback(
    (newTasks: Task[]) => {
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), newTasks]);
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const addTask = useCallback(
    (text: string) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text,
        completed: false,
        timestamp: Date.now(),
      };
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
      saveToHistory(newTasks);
    },
    [tasks, saveToHistory]
  );

  const toggleTask = useCallback(
    (id: string) => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(newTasks);
      saveToHistory(newTasks);
    },
    [tasks, saveToHistory]
  );

  const deleteTask = useCallback(
    (id: string) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      saveToHistory(newTasks);
    },
    [tasks, saveToHistory]
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setTasks(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setTasks(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
