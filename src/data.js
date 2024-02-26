import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr')
      .then(resp => resp.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  }, []);

  const addTask = () => {
    if (!input) return;
    const newTodos = [...todos, { id: Date.now(), task: input }];
    setTodos(newTodos);
    setInput('');
    fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
      method: 'PUT',
      body: JSON.stringify(newTodos),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  };

  const deleteTask = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
      method: 'PUT',
      body: JSON.stringify(newTodos),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  };

  const cleanAllTasks = () => {
    setTodos([]);
    fetch('https://playground.4geeks.com/apis/fake/todos/user/alesanchezr', {
      method: 'PUT',
      body: JSON.stringify([]),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => deleteTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={cleanAllTasks}>Clean All Tasks</button>
    </div>
  );
};

export default ToDoList;

