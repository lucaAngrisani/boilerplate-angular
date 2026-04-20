import { Injectable, Signal, inject, signal } from '@angular/core';
import { SESSION_KEY } from '../../shared/session.key';
import { SessionStorageService } from './session-storage.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SessionUserService {
  private readonly sss = inject(SessionStorageService);

  private readonly _userLogged = signal<User | null>(null);
  readonly userLogged: Signal<User | null> = this._userLogged.asReadonly();

  constructor() {
    /** YOU CAN USE BOTH SessionStorageService AND/OR LocalStorageService */
    this.setCurrentUser(this.getCurrentUser());
  }

  public setCurrentUser(user: User | null): void {
    this._userLogged.set(user);
    this.sss.remove(SESSION_KEY.KEY_USER);
    if (user) this.sss.save(SESSION_KEY.KEY_USER, user);
  }

  public getCurrentUser(): User | null {
    const user = this.sss.load<User>(SESSION_KEY.KEY_USER);
    return user ? new User(user) : null;
  }

  public removeUser(): void {
    this._userLogged.set(null);
    this.sss.remove(SESSION_KEY.KEY_USER);
  }

  public isLoggedUser(): boolean {
    return this.sss.load(SESSION_KEY.KEY_USER) !== null;
  }

  public clear(): void {
    this.removeUser();
  }
}
