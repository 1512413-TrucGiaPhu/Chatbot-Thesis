import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      // allow to access the profile route and block access the register route
      return state.url.startsWith('/profile') ? true : (this.router.navigate(['/']), false);
    } else {
      return state.url.startsWith('/profile') ? (this.router.navigate(['/']), false) : true;
    }
  }
}
