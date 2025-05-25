// src/common/singletons/http.ts
import HttpAxiosManager from '../http/HttpAxiosManager';
import CookiesManagerImp from '../cookies/CookiesManagerImp';

const cookiesManager = new CookiesManagerImp();
const token = cookiesManager.getValue('token'); // O el nombre que uses

export const http = new HttpAxiosManager(process.env.NEXT_PUBLIC_BASE_URL_TASKS ?? '');
http.setToken(token);
