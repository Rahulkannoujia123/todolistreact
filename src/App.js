import React, { useState, useEffect } from 'react';
import './App.css';

function TodoItem({ task, index, deleteTask, completeTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.title);

  const handleDelete = () => {
    deleteTask(index);
  };

  const handleComplete = () => {
    completeTask(index);
  };

  const handleEdit = () => {
    if (editedTask.trim() !== '') {
      editTask(index, editedTask);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          onBlur={handleEdit}
          autoFocus
        />
      ) : (
        <>
          <span
            className={`task-title ${task.completed ? 'completed' : ''}`}
            onClick={handleComplete}
          >
            {task.title}
          </span>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const completeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index, newTitle) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].title = newTitle;
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
        />
      </div>
      <div className="todo-container">
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        {filteredTasks.map((task, index) => (
          <TodoItem
            key={index}
            task={task}
            index={index}
            deleteTask={deleteTask}
            completeTask={completeTask}
            editTask={editTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
