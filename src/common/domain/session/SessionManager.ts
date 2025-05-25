import { CookiesManager } from '@/common/cookies/CookiesManager';

export class SessionManager {
  tokenKey: string = 'token';

  constructor(private cookie: CookiesManager) {}

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setToken(token: string, millisExpiracy: number) {
    this.cookie.setValue({
      name: this.tokenKey,
      value: token,
      millisExpiracy: millisExpiracy,
    });
  }

  getToken(): string | undefined {
    const token = this.cookie.getValue(this.tokenKey);
    return token;
  }

  deleteSession(): void {
    this.cookie.removeValue(this.tokenKey);
  }
}
