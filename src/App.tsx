import React from 'react';
import './App.css';
import { TodoProvider } from './contextApi/ContextForStore';
import TodoManager from './components/TodoManager';

function App() {
  return (
    <TodoProvider>
      <TodoManager/>
    </TodoProvider>
  );
}

export default App;
