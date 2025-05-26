import { Observable } from 'rxjs';
import { GetTasksResponse, Task } from '../models/Task';
import { HttpManager } from '@/common/http/HttpManager';
import { CreateTaskDto } from '../models/CreateTaskDto';

export interface TasksRepository {
  getTasks(): Observable<GetTasksResponse>;
  createTask(task: CreateTaskDto): Observable<CreateTaskDto>;
  createSubtask(task: CreateTaskDto): Observable<CreateTaskDto>;
  updateTask(task: Task): Observable<Task>;
  updateSubtask(task: Task): Observable<Task>;
  deleteTask(taskId: string): Observable<void>;
  deleteSubtask(taskId: string): Observable<void>;
}

export class TasksDataRepository implements TasksRepository {
  private http: HttpManager;

  constructor(http: HttpManager) {
    this.http = http;
  }
  createSubtask(task: CreateTaskDto): Observable<CreateTaskDto> {
    throw new Error('Method not implemented.');
  }
  updateSubtask(task: Task): Observable<Task> {
    throw new Error('Method not implemented.');
  }
  deleteSubtask(taskId: string): Observable<void> {
    throw new Error('Method not implemented.');
  }

  getTasks(): Observable<GetTasksResponse> {
    return this.http.get({
      endpoint: '/tasks',
    });
  }
  createTask(task: CreateTaskDto): Observable<CreateTaskDto> {
    return this.http.post<CreateTaskDto>({
      endpoint: '/tasks',
      body: {
        title: task.title,
        description: task.description,
        status: task.status,
      } as Task,
    });
  }
  updateTask(task: Task): Observable<Task> {
    throw new Error('Method not implemented.');
  }
  deleteTask(taskId: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
