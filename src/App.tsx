import React from 'react';
import './App.css';
import { TaskProvider } from './contextApi/ContextForStore';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <TaskProvider>
      <TaskManager/>
    </TaskProvider>
  );
}

export default App;
