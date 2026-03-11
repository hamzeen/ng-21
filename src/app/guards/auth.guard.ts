// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { sessionStore } from '../stores/session.store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  return sessionStore.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
