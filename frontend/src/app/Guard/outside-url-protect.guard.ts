import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastServiceService } from '../service/toast-service.service';
import ls from 'localstorage-slim';
import { LoginApiService } from '../share/login/login-api.service';

@Injectable({
  providedIn: 'root'
})


export class OutsideUrlProtectGuard implements CanActivate {
  userType!:string
login_token!:string
private previousUrl: string = '';
constructor(private _toast:ToastServiceService,private router:Router,private loginService:LoginApiService)
{
this.userType=<string>ls.get('role')
this.login_token=<string>ls.get('login_token')

// this.router.events.subscribe(event => {
//   if (event instanceof NavigationEnd) {
//     this.previousUrl = this.router.url;
//     console.log(this.previousUrl,'purl')
//   }
// });
this.previousUrl=this.loginService.getPreviousUrl();
console.log(this.loginService.getPreviousUrl(),'abcd')
}

// getPreviousUrl(): string {
//   console.log(this.previousUrl)
//   return this.previousUrl;
// }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
 //Allow access if userType = student
 if(this.login_token){
  //prevent allow access if userType is !=student
  this._toast.showToaster.next({
    severity: 'Error',
    summary: 'Error',
    detail: 'Access Denied: Sorry!! After login You do not have permission to view this page . ',
  });
  this.router.navigateByUrl(this.loginService.getPreviousUrl())
  console.log(this.loginService.getPreviousUrl(),'abcde')
  return false 

}
 else{
  return true;

   }
  
}

}

