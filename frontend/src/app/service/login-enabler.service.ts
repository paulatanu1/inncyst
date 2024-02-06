import { Injectable } from '@angular/core';
import { Subject, subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginEnablerService {
  loginEnable = new Subject<boolean>()
  loginFlow = new Subject<boolean>()
  otpPage = new Subject<boolean>()
  constructor() {
   }
}
