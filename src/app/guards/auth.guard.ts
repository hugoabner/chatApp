import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log("currentUser", authService.getCurrentUser());
  if (
    !authService.getCurrentUser() ||
    Object.keys(authService.getCurrentUser()).length === 0
  ) {
    router.navigateByUrl("login");
    return false;
  }
  return true;
};
