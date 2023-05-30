import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,) { }

  queryParams(source: any) {
    var array = [];
    for (var key in source) {
      array.push(encodeURIComponent(key) + "=" + encodeURIComponent(source[key]));
    }
    return array.join("&");
  }

  /**
    @Date : 23-05-2023
    @Developer : Atanu Paul
    @param url : api url to call like '/regisatration ,/login'
    @param method : method to call like post or put or get or delete
   */
  ApiCallWithLocalization(data: any, url: string, method: string, headertoken: any = undefined) {
    return this.ApiCall(data, url, method, headertoken);
  }

  ApiCall(data: any, url: string, method: string, headertoken: any = undefined, IsUrlrawformat: boolean = false) {
    let paths: string[] = location.pathname.split('/').splice(1, 1);
    

    if (IsUrlrawformat == false) {
      url = environment.API_URL + '/' + environment.API_VERSION + url;
    }

    console.log(headertoken)
    let httpHeaderValue = new HttpHeaders();

    if (headertoken == undefined) {
      console.log(httpHeaderValue)
      httpHeaderValue = httpHeaderValue
    }
    else {
      httpHeaderValue = httpHeaderValue
        .set('Authorization', 'Bearer ' + headertoken)
    }

    if (method == 'post') {
      return this.http.post(url, data, { headers: httpHeaderValue, observe: 'response' })
        .pipe(
          timeout(environment.timeout),
          catchError((e, c) => { return throwError(e) }),
          map((response: any) => {
            console.log(responseobj)
            var responseobj = JSON.parse(JSON.stringify(response.body));
            responseobj.status = response.status;
            return responseobj;
          })
        )

    }
    else if (method == 'get') {
      return this.http.get(url, { headers: httpHeaderValue, observe: 'response' })
        .pipe(
          timeout(environment.timeout),
          catchError((e, c) => { return throwError(e) }),
          map((response: any) => {
            var responseobj = JSON.parse(JSON.stringify(response.body));
            responseobj.status = response.status;
            return responseobj;
          })
        )

    }
    else {
      return this.http.post(url, data, { headers: httpHeaderValue, observe: 'response' })
        .pipe(
          timeout(environment.timeout),
          catchError((e, c) => { return throwError(e) }),
          map((response: any) => {
            var responseobj = JSON.parse(JSON.stringify(response.body));
            responseobj.status = response.status;
            return responseobj;
          })
        )

    }
  }

}
