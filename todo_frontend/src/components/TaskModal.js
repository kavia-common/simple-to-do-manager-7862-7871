import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Modal for adding or editing a task.
 * @param {string} initialText - starting text for input
 * @param {function} onSubmit - callback with input text
 * @param {function} onClose - close modal
 * @param {boolean} isEdit - is editing an existing task
 */
function TaskModal({ initialText, onSubmit, onClose, isEdit }) {
  const [text, setText] = useState(initialText);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="task-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h2>{isEdit ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            autoFocus
            placeholder="Enter task..."
            onChange={(e) => setText(e.target.value)}
            maxLength={100}
            className="modal-input"
          />
          <div className="modal-actions">
            <button
              type="submit"
              className="modal-btn accent"
              disabled={!text.trim()}
            >
              {isEdit ? "Save" : "Add"}
            </button>
            <button
              type="button"
              className="modal-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
