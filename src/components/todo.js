import React from "react";
import axios from "axios";
import styles from "./todo.module.css";

const Todo = ({ todo, reloadTodos }) => {
  const toggleCompleted = async () => {
    axios.post("/api/toggle-completed", { ...todo, completed:!todo.completed }).then(reloadTodos);
  };
  const handleDelete = async () => {
    axios.post("/api/delete-todo", { id: todo._id }).then(reloadTodos);
  };
  return (
    <>
      <label htmlFor={`todo-toggle-${todo._id}`} className={styles.label}>
        Mark Complete
      </label>
      <input
        id={`todo-toggle-${todo._id}`}
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
        className={styles.toggle}
      />
      <p className={`${styles.text} ${todo.completed && styles.completed}`}>
        {todo.text}
      </p>
      <label htmlFor={`todo-delete-${todo._id}`} className={styles.label}>
        Delete todos
      </label>
      <button id={`todo-delete-${todo._id}`} type='button'  className={styles.delete} onClick={handleDelete}>
       <span role='img' aria-label="delete" title="delete">ji</span>
      </button>
    </>
  );
};

export default Todo;
