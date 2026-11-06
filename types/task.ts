export type Status = "Pending" | "Completed";

export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
}
