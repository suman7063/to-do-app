import React from 'react';
import './App.css';
import { TaskProvider } from './contextApi/ContextForStore';
import TodoManager from './components/TodoManager';

function App() {
  return (
    <TaskProvider>
      <TodoManager/>
    </TaskProvider>
  );
}

export default App;
