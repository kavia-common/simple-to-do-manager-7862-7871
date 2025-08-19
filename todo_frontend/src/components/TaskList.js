import React from "react";

// PUBLIC_INTERFACE
/**
 * TaskList renders the list of tasks and controls for complete, edit, delete actions.
 * @param {object[]} tasks
 * @param {function} onComplete
 * @param {function} onDelete
 * @param {function} onEdit
 */
function TaskList({ tasks, onComplete, onDelete, onEdit }) {
  if (!tasks.length)
    return <div className="empty-list">No tasks found.</div>;
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={
            task.completed ? "task-item completed" : "task-item"
          }
        >
          <span
            className="task-text"
            onClick={() => onComplete(task.id)}
            tabIndex={0}
            role="checkbox"
            aria-checked={task.completed}
            style={{
              cursor: "pointer",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.text}
          </span>
          <div className="task-actions">
            <button
              className="edit-btn"
              onClick={() => onEdit(task)}
              aria-label="Edit task"
            >
              ✏️
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
