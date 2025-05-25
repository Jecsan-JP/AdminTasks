export interface ICookieValue {
  name: string;
  value: string;
  millisExpiracy: number;
}

export interface CookiesManager {
  setValue(value: ICookieValue): void;
  getValue(name: string): string | undefined;
  removeValue(name: string): void;
}
