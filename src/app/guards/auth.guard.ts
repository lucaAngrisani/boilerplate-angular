import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { SessionUserService } from '../services/session/session-user.service';
import { ROUTE } from '../shared/route.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const sessionUserService: SessionUserService = inject(SessionUserService);

  if (sessionUserService.userObservable.getValue()) {
    return true;
  } else {
    router.navigate([ROUTE.PUBLIC]);
    return false;
  }
};
