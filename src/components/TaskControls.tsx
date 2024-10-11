import React from "react";
import { FilterType } from "../utils/typeDeclaration";
import { useTasks } from "../contextApi/ContextForStore";

const TaskControls = ({
  newTask,
  setNewTask,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
}: {
  newTask: string;
  setNewTask: (value: string) => void;
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) => {
  const context = useTasks();
  if (!context) throw new Error('TaskContext must be used within TaskProvider');
  const { addTask, undo, redo } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <div className="space-y-4">
      {/* <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow"
        />
        <Button type="submit" disabled={!newTask.trim()}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </form>
      
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button
            variant={filter === 'incomplete' ? 'default' : 'outline'}
            onClick={() => setFilter('incomplete')}
          >
            Incomplete
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={undo}>
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={redo}>
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className="pl-10"
        />
      </div> */}
    </div>
  );
};