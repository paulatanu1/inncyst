import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastServiceService } from '../service/toast-service.service';
import ls from 'localstorage-slim';

@Injectable({
  providedIn: 'root'
})
export class IndustryVerificationGuard implements CanActivate {
  userType!:string
  login_token!:string
  constructor(private _toast:ToastServiceService,private router:Router)
{
  this.userType=<string>ls.get('role')
  this.login_token=<string>ls.get('login_token')
 }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    
      //Allow access if userType = student
    if(this.userType === 'industry'){
      return true;
    }
     else{
      //prevent allow access if userType is !=student
      this._toast.showToaster.next({
        severity: 'Error',
        summary: 'Error',
        detail: 'Access Denied: You do not have permission to view this page. ',
      });
    alert('Access Denied: You do not have permission to view this page IV.')
      this.router.navigateByUrl('/home')
      return false
    }
  }
}


