import React, { useState } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1>Todo List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>
          Add Task
        </button>
      </div>
      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.task}>
            <span
              onClick={() => toggleComplete(task.id)}
              style={{
                ...styles.text,
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <span
              onClick={() => deleteTask(task.id)}
              class="material-symbols-outlined"
              style={styles.deleteIcon}
            >
              delete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    width: "clamp(300px, 30vw, 800px)",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    color: "#333",
    textShadow: "0px 0px 2px #333",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "70%",
    boxShadow: "0px 0px 1px #333",
  },
  button: {
    width: "30%",
    marginLeft: "10px",
    backgroundColor: "#4361ee",
    fontSize: "14px",
    textAlign: "center",
    textShadow: "0px 0px 1px #a2d2ff",
    color: "#fff",
    border: "none",
    borderRadius: "2px",
    boxShadow: "2px 2px 5px #333",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  text: {
    cursor: "pointer",
  },
  deleteIcon: {
    color: "red",
    textShadow: "none",
    cursor: "pointer",
  },
};

export default TodoApp;
