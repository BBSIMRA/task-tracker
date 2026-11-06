import type { Task, Status } from "../types/task";
import taskData from "../data/tasks.json";

// Store the task data in memory
let tasks: Task[] = taskData as Task[];

// Simulate a delay between 500 and 800 milliseconds
function delay(): Promise<void> {
  const milliseconds = Math.floor(Math.random() * 301) + 500;

  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

// Simulate a 20% chance of failure
function simulateFailure(): void {
  if (Math.random() < 0.2) {
    throw new Error("Something went wrong. Please try again.");
  }
}

// Get all tasks
export async function getTasks(): Promise<Task[]> {
  await delay();
  simulateFailure();

  return [...tasks];
}

// Update a task's status
export async function updateTaskStatus(
  id: number,
  newStatus: Status
): Promise<Task> {
  await delay();
  simulateFailure();

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    throw new Error("Task not found.");
  }

  const updatedTask: Task = {
    ...tasks[taskIndex],
    status: newStatus,
  };

  tasks = tasks.map((task) =>
    task.id === id ? updatedTask : task
  );

  return updatedTask;
}