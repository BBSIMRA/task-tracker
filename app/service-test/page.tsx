
"use client";

import { useState } from "react";
import {
  getTasks,
  updateTaskStatus,
} from "../../services/taskService";

import type { Task } from "../../types/task";

export default function ServiceTestPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState("Ready to test");

  // Test getTasks()
  async function testGetTasks() {
    try {
      setMessage("Loading tasks...");

      const result = await getTasks();

      setTasks(result);
      setMessage(`Success! Retrieved ${result.length} tasks.`);
      
      console.log("getTasks result:", result);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  // Test updateTaskStatus()
  async function testUpdateStatus() {
    if (tasks.length === 0) {
      setMessage("No tasks available to update.");
      return;
    }

    try {
      setMessage("Updating task...");

      const result = await updateTaskStatus(
        tasks[0].id,
        "Completed"
      );

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === result.id ? result : task
        )
      );

      setMessage(`Updated task: ${result.title}`);

      console.log("updateTaskStatus result:", result);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  return (
    <main>
      <h1>Service Testing</h1>

      <button onClick={testGetTasks}>
        Test getTasks()
      </button>

      <button onClick={testUpdateStatus}>
        Test updateTaskStatus()
      </button>

      <p>{message}</p>

      {tasks.map((task) => (
        <p key={task.id}>
          {task.title} - {task.status}
        </p>
      ))}
    </main>
  );
}

