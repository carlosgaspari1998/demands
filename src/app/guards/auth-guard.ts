import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
//import { AuthenticatorService } from '../services/authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor() { }
}

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  
  return true;/*inject(AuthenticatorService).userAuthenticated()
    ? true
    : inject(Router).navigate(['/login']);*/
};
