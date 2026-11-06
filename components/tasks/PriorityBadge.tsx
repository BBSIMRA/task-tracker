
import type { Priority } from "../../types/task";

interface PriorityBadgeProps {
  priority: Priority;
}

export default function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  return (
    <span className={`priority ${priority.toLowerCase()}`}>
      {priority}
    </span>
  );
}
