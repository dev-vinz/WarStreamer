import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../authentication/auth.service';

export const authGuard: CanActivateFn = async (_: ActivatedRouteSnapshot) => {
  // Some injections
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // Refresh all the user informations
  await authService.fetchDiscordUserProfile();

  if (!authService.isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  // User is authenticated
  return true;
};
