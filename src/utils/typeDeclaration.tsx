
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  timestamp: number;
};

export type FilterType = 'all' | 'completed' | 'incomplete';

export type TodoContextType = {
  todo: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  undo: () => void;
  redo: () => void;
  undoStatus: boolean;
  redoStatus: boolean;
};
