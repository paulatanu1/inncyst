import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginEnablerService {
  loginEnable = new Subject<boolean>()
  constructor() { }
}
