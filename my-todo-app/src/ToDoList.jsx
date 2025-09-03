import React, { useState } from "react";
import "./app.css";

 function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(true);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input,
        completed: false,
        important: false,
        reminder: null,
        editing: false,
      },
    ]);
    setInput("");
  };
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const toggleImportant = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const startEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, editing: true } : task
      )
    );
  };
  const saveEdit = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, editing: false } : task
      )
    );
  };
  const moveUp = (index) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  };
  const moveDown = (index) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
    setTasks(newTasks);
  };
  const setReminder = (id, dateTime) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: dateTime } : task
      )
    );
  };
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    if (filter === "Important") return task.important;
    return true;
  });

  return (
    <div className={darkMode ? "container dark" : "container light"}>
      <div className="todo-box">
        <h2>Welcome to To-Do List</h2>
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☾" : "☀"}
        </button>

        <div className="input-row">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <div className="filter-row">
          <button
            className={filter === "All" ? "active" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={filter === "Pending" ? "active" : ""}
            onClick={() => setFilter("Pending")}
          >
            Pending
          </button>
          <button
            className={filter === "Completed" ? "active" : ""}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>
          <button
            className={filter === "Important" ? "active" : ""}
            onClick={() => setFilter("Important")}
          >
            Important
          </button>
        </div>
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={`task-row ${task.important ? "important" : ""}`}
              >
                {task.editing ? (
                  <input
                    type="text"
                    defaultValue={task.text}
                    onBlur={(e) => saveEdit(task.id, e.target.value)}
                    autoFocus
                  />
                ) : (
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                )}
                <div className="actions">
                  <button onClick={() => toggleImportant(task.id)}>⭐</button>
                  <button onClick={() => startEdit(task.id)}>✏️</button>
                  <button onClick={() => toggleComplete(task.id)}>
                    {task.completed ? "↩️" : "✅"}
                  </button>
                  <input
                    type="datetime-local"
                    onChange={(e) => setReminder(task.id, e.target.value)}
                  />
                  {task.reminder && <small>⏰ {task.reminder}</small>}
                  <button onClick={() => moveUp(index)}>⬆️</button>
                  <button onClick={() => moveDown(index)}>⬇️</button>
                  <button onClick={() => deleteTask(task.id)}>❌</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default TodoList
