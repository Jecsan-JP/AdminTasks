import CookiesManagerImp from '../cookies/CookiesManagerImp';
import { SessionManager } from '../domain/session/SessionManager';

export const sessionManager = new SessionManager(new CookiesManagerImp());
