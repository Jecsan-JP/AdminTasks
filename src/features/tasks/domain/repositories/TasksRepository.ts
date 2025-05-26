import { Observable } from 'rxjs';
import { GetTasksResponse, Task } from '../models/Task';
import { HttpManager } from '@/common/http/HttpManager';
import { CreateTaskDto } from '../models/CreateTaskDto';

export interface TasksRepository {
  getTasks(): Observable<GetTasksResponse>;
  createTask(task: CreateTaskDto): Observable<CreateTaskDto>;
  createSubtask(task: CreateTaskDto): Observable<CreateTaskDto>;
  updateTask(task: CreateTaskDto, idTask: string): Observable<CreateTaskDto>;
  deleteTask(taskId: string): Observable<void>;
}

export class TasksDataRepository implements TasksRepository {
  private http: HttpManager;

  constructor(http: HttpManager) {
    this.http = http;
  }

  createSubtask(task: CreateTaskDto): Observable<CreateTaskDto> {
    return this.http.post<CreateTaskDto>({
      endpoint: '/tasks',
      body: {
        title: task.title,
        description: task.description,
        status: task.status,
        parentTaskId: task.parentTaskId,
      } as Task,
    });
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
  updateTask(task: CreateTaskDto, taskId: string): Observable<CreateTaskDto> {
    return this.http.put<CreateTaskDto>({
      endpoint: `/tasks/${taskId}`,
      body: {
        title: task.title,
        description: task.description,
        status: task.status,
      } as CreateTaskDto,
    });
  }
  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>({
      endpoint: `/tasks/${taskId}`,
    });
  }
}
