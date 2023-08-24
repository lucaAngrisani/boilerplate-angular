import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SessionUserService } from "../services/session/session.user.service";
import { ROUTE } from "../shared/route.enum";

@Injectable({
  providedIn: "root"
})
export class AuthGuard {

  constructor(
    private router: Router,
    private sessionUserService: SessionUserService,
  ) { }

  canActivate() {
    if (
      this.sessionUserService.userObservable.getValue()
    ) {
      return true;
    } else {
      this.router.navigate([`${ROUTE.PUBLIC}`]);
      return false;
    }
  }
}
