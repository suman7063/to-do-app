import React from 'react';
import './App.css';
import { TaskProvider } from './contextApi/ContextForStore';

function App() {
  return (
    <TaskProvider>
      <p></p>
    </TaskProvider>
  );
}

export default App;
