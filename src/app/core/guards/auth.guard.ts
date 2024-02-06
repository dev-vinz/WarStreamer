import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../authentication/auth.service';

import moment from 'moment';

export const authGuard: CanActivateFn = async (_: ActivatedRouteSnapshot) => {
  // Some injections
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // Update the last access time
  authService.lastAccess = moment.utc();

  if (!authService.isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  // User is authenticated
  return true;
};
