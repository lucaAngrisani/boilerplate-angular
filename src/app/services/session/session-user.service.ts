import { Injectable, WritableSignal, signal } from "@angular/core";
import { User } from "src/app/models/user.model";
import { SESSION_KEY } from "../../shared/session.key";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
  providedIn: "root",
})
export class SessionUserService {
  public userLogged: WritableSignal<User | null> = signal(null);

  /** YOU CAN USE BOTH SessionStorageService AND/OR LocalStorageService */
  constructor(
    private sss: SessionStorageService,
  ) {
    this.setCurrentUser(this.getCurrentUser());
  }

  public setCurrentUser(_user: User) {
    this.userLogged.set(_user);

    this.sss.remove(SESSION_KEY.KEY_USER);
    this.sss.save(SESSION_KEY.KEY_USER, _user);
  }

  public getCurrentUser(): User {
    let user = this.sss.load<User>(SESSION_KEY.KEY_USER);
    return user && new User(user);
  }

  public removeUser() {
    this.userLogged.set(null);
    return this.sss.remove(SESSION_KEY.KEY_USER);
  }

  public isLoggedUser() {
    return this.sss.load(SESSION_KEY.KEY_USER) != null;
  }

  public clear() {
    this.removeUser();
  }
}
