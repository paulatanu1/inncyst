import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean{

      // const performance = window.performance || window.msPerformance || window.webkitPerformance;
      if (performance && performance.navigation.type == 1) {
        console.log(performance.navigation)
        // Page is being refreshed (type 1 is a page reload)
        this.router.navigate(['/jobs/jobs/my-applyed-job']); // Navigate to the parent route
         return true; // Preven activation of the current route
      }
      return true; // Allow activation for non-refresh scenarios
    }
  
}
