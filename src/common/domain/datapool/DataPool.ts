import { BehaviorSubject, Observable } from 'rxjs';

class DataPool<T> {
  private subject: BehaviorSubject<T>;

  constructor(initialValue: T) {
    this.subject = new BehaviorSubject<T>(initialValue);
  }

  // Obtener el stream del BehaviorSubject
  getStream(): Observable<T> {
    return this.subject.asObservable();
  }

  // Obtener el valor actual del BehaviorSubject
  getValue(): T {
    return this.subject.getValue();
  }

  // Actualizar el valor del BehaviorSubject
  setValue(newValue: T): void {
    this.subject.next(newValue);
  }
}

export default DataPool;
