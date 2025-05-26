import { Observable } from 'rxjs';
import { Comment } from '../models/Comment';
import { HttpManager } from '@/common/http/HttpManager';

export interface CommentsRepository {
  getComments(taskId: string): Observable<Comment[]>;
  createComment(taskId: string, content: string): Observable<Comment>;
  updateComment(taskId: string, content: string): Observable<Comment>;
  deleteComment(commentId: string): Observable<void>;
}

export class CommentsDataRepository implements CommentsRepository {
  private http: HttpManager;

  constructor(http: HttpManager) {
    this.http = http;
  }
  updateComment(taskId: string, content: string): Observable<Comment> {
    return this.http.put<Comment>({
      endpoint: `/comments/${taskId}`,
      body: { content },
    });
  }

  getComments(taskId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>({
      endpoint: `/comments/${taskId}`,
    });
  }

  createComment(taskId: string, content: string): Observable<Comment> {
    return this.http.post<Comment>({
      endpoint: `/comments/${taskId}`,
      body: { content },
    });
  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>({
      endpoint: `/comments/${commentId}`,
    });
  }
}
