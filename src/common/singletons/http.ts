import HttpAxiosManager from '../http/HttpAxiosManager';
import { HttpManager } from '../http/HttpManager';

export const http: HttpManager = new HttpAxiosManager(
  process.env.NEXT_PUBLIC_BASE_URL_TASKS ?? ''
);
