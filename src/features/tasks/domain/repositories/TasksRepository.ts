import { Observable } from 'rxjs';
import { GetTasksResponse, Task } from '../models/Task';
import { HttpManager } from '@/common/http/HttpManager';

export interface TasksRepository {
  getTasks(): Observable<GetTasksResponse>;
  createTask(task: Task): Observable<Task>;
  updateTask(task: Task): Observable<Task>;
  deleteTask(taskId: string): Observable<void>;
}

export class TasksDataRepository implements TasksRepository {
  private http: HttpManager;

  constructor(http: HttpManager) {
    this.http = http;
  }

  getTasks(): Observable<GetTasksResponse> {
    return this.http.get({
      endpoint: '/tasks',
    });
  }
  createTask(task: Task): Observable<Task> {
    throw new Error('Method not implemented.');
  }
  updateTask(task: Task): Observable<Task> {
    throw new Error('Method not implemented.');
  }
  deleteTask(taskId: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
