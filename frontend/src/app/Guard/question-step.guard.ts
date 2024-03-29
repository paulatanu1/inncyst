import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import ls from 'localstorage-slim';
import { Observable } from 'rxjs';
import { ToastServiceService } from '../service/toast-service.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionStepGuard implements CanActivate {
  questionStep: boolean = false;
  
  constructor(private _toast:ToastServiceService,private router:Router) {
    this.questionStep = <boolean>ls.get('questionStep');
  }
  canActivate(): boolean {
    if (ls.get('questionStep') == true) {
      return true;
    }
    else{
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'error',
        detail: 'Access Denied: please update your profile to view the page '
      });
      this.router.navigateByUrl('/industry/profile')
      return false
    }
  }
}
