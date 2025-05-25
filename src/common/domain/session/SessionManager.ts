import { CookiesManager } from '@/common/cookies/CookiesManager';

export class SessionManager {
  tokenKey: string = 'token';

  constructor(private cookie: CookiesManager) {}

  setToken(token: string, millisExpiracy: number) {
    this.cookie.setValue({
      name: this.tokenKey,
      value: token,
      millisExpiracy: millisExpiracy,
    });
  }

  getToken(): string | undefined {
    return this.cookie.getValue(this.tokenKey);
  }

  deleteSession(): void {
    this.cookie.removeValue(this.tokenKey);
  }
}
