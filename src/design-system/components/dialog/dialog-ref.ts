import { Subject, Observable } from 'rxjs';

export class DialogRef<T = any> {
  private readonly _afterClosed$ = new Subject<T | undefined>();

  afterClosed(): Observable<T | undefined> {
    return this._afterClosed$.asObservable();
  }

  close(result?: T): void {
    this._afterClosed$.next(result);
    this._afterClosed$.complete();
  }
}
