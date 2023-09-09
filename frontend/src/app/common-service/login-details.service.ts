import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {

  public loginDetails= new Subject();

  constructor() {}
}
