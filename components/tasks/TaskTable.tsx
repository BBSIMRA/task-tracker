
import type { Task, Status } from "../../types/task";
import TaskRow from "./TaskRow";

interface TaskTableProps {
  tasks: Task[];
  onStatusChange: (id: number, status: Status) => void;
  updatingTaskId: number | null;
}

export default function TaskTable({
  tasks,
  onStatusChange,
  updatingTaskId,
}: TaskTableProps) {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            updating={updatingTaskId === task.id}
          />
        ))}
      </tbody>
    </table>

  );
}
