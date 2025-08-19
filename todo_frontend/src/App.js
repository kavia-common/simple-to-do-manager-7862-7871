import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";

// PUBLIC_INTERFACE
/**
 * Main app component for the simple to-do manager.
 * Manages tasks state and handles CRUD operations locally for now.
 * Prepares for backend integration (tasks_database) for persistence.
 */
function App() {
  // Task model: { id, text, completed }
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Simulate fetch from backend on mount for future integration
  useEffect(() => {
    // Load from localStorage as mock persistence
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  // Persist tasks on change for mockup
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // PUBLIC_INTERFACE
  /** Handler to add a new task */
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  // PUBLIC_INTERFACE
  /** Handler to update an existing task */
  const updateTask = (id, newText) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  // PUBLIC_INTERFACE
  /** Handler to toggle completed status */
  const toggleCompleteTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // PUBLIC_INTERFACE
  /** Handler to delete a task */
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // PUBLIC_INTERFACE
  /** Filter tasks by status */
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Modal control
  const openAddModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };
  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };
  const closeModal = () => {
    setEditingTask(null);
    setModalOpen(false);
  };

  // Modal confirm
  const handleModalSubmit = (text) => {
    if (editingTask) updateTask(editingTask.id, text);
    else addTask(text);
    closeModal();
  };

  // PUBLIC_INTERFACE
  // Render App
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <FilterBar filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onComplete={toggleCompleteTask}
          onDelete={deleteTask}
          onEdit={openEditModal}
        />
        <button
          className="add-btn"
          onClick={openAddModal}
          aria-label="Add new task"
        >
          ＋ Add Task
        </button>
      </div>
      {modalOpen && (
        <TaskModal
          initialText={editingTask ? editingTask.text : ""}
          onSubmit={handleModalSubmit}
          onClose={closeModal}
          isEdit={!!editingTask}
        />
      )}
    </div>
  );
}

export default App;
