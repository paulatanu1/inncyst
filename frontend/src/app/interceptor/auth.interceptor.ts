import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import ls from 'localstorage-slim'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
	token: any;	

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    if (localStorage.getItem('job') != null) {
      this.token = localStorage.getItem('job');
  }
  else if (localStorage.getItem('lab') != null) {
      this.token = localStorage.getItem('lab');
  }
  else if (localStorage.getItem('expert') != null) {
      this.token = localStorage.getItem('expert');
  }
  else if (localStorage.getItem('industry') != null) {
    this.token = localStorage.getItem('industry');
  }

  else if(ls.get('type') !=null || ls.get('type') != undefined){
    this.token = ls.get('login_token');
  }
  if(this.token!=null)
  {
      // if the token is  stored in localstorage add it to http header
      // const headers = new HttpHeaders().set("access-token", this.token);
      //clone http to the custom AuthRequest and send it to the server 
      const AuthRequest = request.clone({
          setHeaders: {
            'Accept'       : 'application/json',
            'Authorization': 'Bearer '+this.token,
          },
        });
      return next.handle(AuthRequest)
  } else {
      return next.handle(request);
  }
}
}
