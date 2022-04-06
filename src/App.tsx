import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-10 mt-2">
        ToDo List
      </h1>
      <TodoList />
    </div>
  );
}

export default App;
