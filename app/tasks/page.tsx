
"use client";

import { useEffect, useMemo, useState } from "react";
import "./task.css";

import { getTasks, updateTaskStatus } from "../../services/taskService";
import type { Task, Status, Priority } from "../../types/task";

import TaskFilters from "../../components/tasks/TaskFilters";
import TaskTable from "../../components/tasks/TaskTable";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null);

  // Filter and sorting states
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("High to Low");


  // Load tasks
  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      setError("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadTasks();
  }, []);

  // Update task status
  async function handleStatusChange(id: number, status: Status) {
    setUpdatingTaskId(id);
    setError("");

    try {
      const updatedTask = await updateTaskStatus(id, status);

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch {
      setError("Unable to update task. Please try again.");
    } finally {
      setUpdatingTaskId(null);
    }
  }

  // Filter and sort tasks
  const displayedTasks = useMemo(() => {
  const priorityOrder: Record<Priority, number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  return tasks
    .filter((task) => {
      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      const difference =
        priorityOrder[a.priority] - priorityOrder[b.priority];

      return sortOrder === "High to Low"
        ? difference
        : -difference;
    });
}, [tasks, statusFilter, priorityFilter, sortOrder]);

const pendingCount = tasks.filter(
  (task) => task.status === "Pending"
).length;

const completedCount = tasks.filter(
  (task) => task.status === "Completed"
).length;
const progress = tasks.length === 0
  ? 0
  : Math.round((completedCount / tasks.length) * 100);

  return (
    <main className="tasks-page">
      <h1>Task Tracker</h1>

      <div className="progress-section">
  <div className="progress-heading">
    <span>Task Progress</span>
    <span>{completedCount} / {tasks.length}</span>
  </div>

  <div className="progress-track">
    <div
      className="progress-fill"
      style={{ width: `${progress}%` }}
    />
  </div>

  <div className="progress-labels">
    <span className="completed-label">
      {completedCount} Completed
    </span>

    <span className="pending-label">
      {pendingCount} Pending
    </span>
  </div>

  <p className="progress-text">
    {progress}% completed
  </p>
</div>
      {/* Reusable filter component */}
      <TaskFilters
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  priorityFilter={priorityFilter}
  setPriorityFilter={setPriorityFilter}
  sortOrder={sortOrder}
  setSortOrder={setSortOrder}
/>

      {/* Loading state */}
      {loading && <p>Loading tasks...</p>}

      {/* Error state */}
      {!loading && error && (
        <div className="message">
          <p>{error}</p>
          <button onClick={loadTasks}>Retry</button>
        </div>
      )}

      {/* Task table */}
      {!loading && !error && displayedTasks.length > 0 && (
        <TaskTable
          tasks={displayedTasks}
          onStatusChange={handleStatusChange}
          updatingTaskId={updatingTaskId}
        />
      )}

      {/* Empty state */}
      {!loading && !error && displayedTasks.length === 0 && (
        <div className="message">
          <p>No tasks match your filters.</p>
          <button
  onClick={() => {
    setStatusFilter("All");
    setPriorityFilter("All");
    setSortOrder("High to Low");
  }}
>
  Clear Filter
</button>
        </div>
      )}
    </main>
  );
}
