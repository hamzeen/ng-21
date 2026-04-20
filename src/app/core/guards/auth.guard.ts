// auth.guard.ts
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { sessionStore } from '../store/session.store';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);

  if (sessionStore.isAuthenticated()) {
    return true;
  }

  // Store the intended URL
  sessionStore.setReturnUrl(state.url);

  return router.createUrlTree(['/login']);
};
