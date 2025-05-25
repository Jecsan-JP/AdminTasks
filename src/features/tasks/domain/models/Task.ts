import { Comment } from './Comment';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  parentTaskId: string | null;
  __v: number;
  subtasks: Task[];
  comments: Comment[];
}
export interface GetTasksResponse {
  tasks: Task[];
}
