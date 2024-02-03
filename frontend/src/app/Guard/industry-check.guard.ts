import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import ls from 'localstorage-slim';
import { Observable } from 'rxjs';
import { ToastServiceService } from '../service/toast-service.service';

@Injectable({
  providedIn: 'root'
})
export class IndustryCheckGuard implements CanActivate {
  userType!:string
  login_token!:string
  constructor(private _toast:ToastServiceService,private router:Router)
{
  this.userType=<string>ls.get('role')
  this.login_token=<string>ls.get('login_token')
}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.userType === 'industry' && this.login_token){
      this.router.navigateByUrl('/industry')
      return false
    }
      return true;

  }
  
}
