
export type Task = {
  id: string;
  text: string;
  completed: boolean;
  timestamp: number;
};

export type FilterType = 'all' | 'completed' | 'incomplete';

export type TaskContextType = {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};
