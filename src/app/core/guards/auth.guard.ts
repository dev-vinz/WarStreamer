import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../authentication/auth.service';

import { environment } from '../../../environments/environment';

import moment from 'moment';

export const authGuard: CanActivateFn = async (_: ActivatedRouteSnapshot) => {
  // Some injections
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // Get the moment now and the next access
  const now = moment.utc();
  const nextAccess = authService.lastAccess.add(
    environment.authentication.accessTokenValidity,
    'hours'
  );

  // Refresh all the user informations
  if (!nextAccess.isValid() || now.isAfter(nextAccess)) {
    authService.lastAccess = now;
    await authService.fetchDiscordUserProfile();
  }

  if (!authService.isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  // User is authenticated
  return true;
};
