import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, type CanActivateFn } from '@angular/router';
import { SessionUserService } from '../services/session/session-user.service';
import { ROUTE } from '../shared/route.enum';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const sessionUserService: SessionUserService = inject(SessionUserService);

  if (sessionUserService.userLogged()) {
    return true;
  } else {
    router.navigate([ROUTE.PUBLIC]);
    return false;
  }
};
