import { IUser } from '@/common/domain/models/UserModel';
import { HttpManager } from '@/common/http/HttpManager';
import { LoginRequestDto } from '../models/LoginRequestDto';
import { RegisterResponseDto } from '../models/RegisterResponseDto';
import { Observable } from 'rxjs';

export interface RegisterRepository {
  register(data: LoginRequestDto): Observable<RegisterResponseDto>;
}

export class RegisterDataRepository implements RegisterRepository {
  private http: HttpManager;

  constructor(http: HttpManager) {
    this.http = http;
  }
  register(data: LoginRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>({
      endpoint: '/users',
      body: {
        username: data.username,
        password: data.password,
      } as IUser,
    });
  }
}
