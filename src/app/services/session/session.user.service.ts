import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/app/models/user.model";
import { SESSION_KEY } from "../../shared/session.key";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
  providedIn: "root",
})
export class SessionUserService {
  public userObservable: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  /** YOU CAN USE BOTH SessionStorageService AND LocalStorageService */
  constructor(
    private sss: SessionStorageService,
  ) {
    this.userObservable.next(this.getCurrentUser());
  }

  public setCurrentUser(_user: User) {
    this.userObservable.next(_user);

    this.sss.remove(SESSION_KEY.KEY_USER);
    this.sss.save(SESSION_KEY.KEY_USER, _user.toSession());
  }

  public setLoginSucceded(_isSucceded: boolean) {
    this.sss.save("isLoginSucceeded", _isSucceded);
  }

  public getLoginSucceded() {
    return this.sss.load("isLoginSucceeded");
  }

  public getCurrentUser(): User {
    let user = this.sss.load(SESSION_KEY.KEY_USER);
    return user && new User(user);
  }

  public removeUser() {
    this.userObservable.next(null);
    return this.sss.remove(SESSION_KEY.KEY_USER);
  }

  public isLoggedUser() {
    return this.sss.load(SESSION_KEY.KEY_USER) != null;
  }

  public getObservableUser(): Observable<User> {
    if (this.isLoggedUser()) {
      this.fetchUser();
    }
    return this.userObservable.asObservable();
  }

  public fetchUser(): void {
    let user: User = this.getCurrentUser();
    // user should contains roles has been granted
    this.userObservable.next(user);
  }

  public clear() {
    this.removeUser();
  }
}
