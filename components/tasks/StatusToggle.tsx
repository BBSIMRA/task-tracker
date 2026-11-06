
import type { Status } from "../../types/task";

interface StatusToggleProps {
  status: Status;
  taskTitle: string;
  onChange: (newStatus: Status) => void;
  disabled?: boolean;
}

export default function StatusToggle({
  status,
  taskTitle,
  onChange,
  disabled = false,
}: StatusToggleProps) {
  return (
    <select
      value={status}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as Status)}
      aria-label={`Change status for ${taskTitle}`}
    >
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>
  );
}
