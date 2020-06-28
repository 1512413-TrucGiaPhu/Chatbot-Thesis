import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, public data: DataService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      !this.data.user ? await this.data.getProfile() : '';
      // allow to access the profile route and block access the register route
      return (state.url.startsWith('/profile') || (state.url.startsWith('/admin-chat') && (this.data.user && this.data.user.isSeller))) ? true : (this.router.navigate(['/']), false);
    } 
    else {
      if (state.url.startsWith('/profile')) {
        return (this.router.navigate(['/']), false);
      }
      if (state.url.startsWith('/admin-chat')) {
        if (!this.data.user || !this.data.user.isSeller) {
          return (this.router.navigate(['/']), false);
        }
      }
      // pass all condition
      return true;
    }
  }
}
