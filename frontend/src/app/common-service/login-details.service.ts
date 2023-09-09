import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {

  public loginDetails= new Subject();
  public a = new Subject()

  constructor() { console.log(this.a)}

  // sendData(data: any) {
  //   this.loginDetails.next(data);
  // }

  // getData() {
  //   return of(this.loginDetails);
  // }
}
