import React from "react";

// PUBLIC_INTERFACE
/**
 * FilterBar lets the user choose the completion status to filter the task list.
 * @param {string} filter - current selected filter ('all'|'active'|'completed')
 * @param {function} setFilter - callback to set the filter
 */
function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-bar">
      <button
        className={filter === "all" ? "filter active" : "filter"}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={filter === "active" ? "filter active" : "filter"}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={filter === "completed" ? "filter active" : "filter"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterBar;
