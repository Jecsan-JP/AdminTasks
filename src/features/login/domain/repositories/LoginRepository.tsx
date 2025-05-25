import { map, Observable } from 'rxjs';
import { LoginRequestDto } from '../models/LoginRequestDto';
import { LoginResponseDto } from '../models/LoginResponseDto';
import { HttpManager } from '@/common/http/HttpManager';

export interface LoginRepository {
  login(dto: LoginRequestDto): Observable<LoginResponseDto>;
}

export class LoginDataRepository implements LoginRepository {
  private http: HttpManager;

  constructor(http: HttpManager) {
    this.http = http;
  }

  login(dto: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http
      .post<LoginResponseDto>({
        endpoint: '/users/login',
        body: dto,
      })
      .pipe(
        map((value) => {
          if (!value) {
            throw Error('Value null');
          }
          this.http.setToken(value.token);
          return value;
        })
      );
  }
}
