
import type { Task, Status } from "../../types/task";
import PriorityBadge from "./PriorityBadge";
import StatusToggle from "./StatusToggle";

interface TaskRowProps {
  task: Task;
  onStatusChange: (id: number, status: Status) => void;
  updating: boolean;
}

export default function TaskRow({
  task,
  onStatusChange,
  updating,
}: TaskRowProps) {
  return (
    <tr className={task.status === "Completed" ? "completed" : ""}>
      <td>{task.title}</td>

      <td>
        <StatusToggle
          status={task.status}
          taskTitle={task.title}
          disabled={updating}
          onChange={(newStatus) =>
            onStatusChange(task.id, newStatus)
          }
        />
      </td>

      <td>
        <PriorityBadge priority={task.priority} />
      </td>
    </tr>
  );
}
