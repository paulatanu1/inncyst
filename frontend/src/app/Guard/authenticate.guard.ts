import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastServiceService } from '../service/toast-service.service';
import ls from 'localstorage-slim';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard implements CanActivate {
  userType!: string;
  login_token!: string;
  constructor(private _toast: ToastServiceService, private router: Router) {
    this.userType = <string>ls.get('role');
    this.login_token = <string>ls.get('login_token');
    console.log(this.login_token, 'token1');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //Allow access if userType = student
    console.log(this.login_token, 'token2');
    if (this.login_token) {
      return true;
    } else {
      //prevent allow access if userType is !=student
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'error',
        detail: 'Access Denied: You do not have permission to view this page. ',
      });
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
