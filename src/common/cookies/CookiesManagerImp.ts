import Cookie from 'js-cookie';
import { CookiesManager, ICookieValue } from './CookiesManager';

class CookiesManagerImp implements CookiesManager {
  setValue(value: ICookieValue) {
    const expirationDate = new Date(
      new Date().getTime() + value.millisExpiracy
    );

    Cookie.set(value.name, value.value, {
      expires: expirationDate, //One day
      secure: true,
      sameSite: 'strict',
      path: '/', //Establece el camino de la URL para la cual la cookie es válida. / significa que la cookie es válida para todo el dominio.
    });
  }

  getValue(name: string): string | undefined {
    return Cookie.get(name);
  }

  removeValue(name: string) {
    return Cookie.remove(name);
  }
}

export default CookiesManagerImp;
