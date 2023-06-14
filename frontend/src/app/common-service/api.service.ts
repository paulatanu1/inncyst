import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';
import { HttpClient, HttpHeaders } from '@angular/common/http';
ls.config.encrypt = environment.LS_CONFIG_ENCRYPT;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  ApiCallWithLocalization(
    data: any,
    url: any,
    method: any,
    headertoken: any = undefined
  ) {
    // let lang = this._commonHelperService.GetLanguage();
    return this.ApiCall(data, url, method, headertoken);
  }

  ApiCall(
    data: any,
    url: any,
    method: any,
    headertoken: any = undefined,
    localization: any = 'en',
    IsUrlrawformat: boolean = false
  ) {
    let paths: string[] = location.pathname.split('/').splice(1, 1);

    if (IsUrlrawformat == false) {
      url = environment.API_URL + '/' + environment.API_VERSION + url;
    }

    let httpHeaderValue = new HttpHeaders();
    if (headertoken == undefined) {
      httpHeaderValue = httpHeaderValue.set('X-localization', localization);
    } else {
      httpHeaderValue = httpHeaderValue
        .set('Authorization', 'Bearer ' + ls.set('login_token',true))
        //.set('Content-Type', 'application/json')
        .set('X-localization', localization);
    }

    if (method == 'post') {
      return this.http
        .post(url, data, { headers: httpHeaderValue, observe: 'response' })
        .pipe(
          timeout(environment.API_TIMEOUT),
          catchError((e, c) => {
            return throwError(e);
          }),
          map((response: any) => {
            var responseobj = JSON.parse(JSON.stringify(response.body));
            responseobj.status = response.status;
            console.log(responseobj.status ,'status')
            console.log(responseobj.token , 'token');
            if (responseobj.token != undefined) {
              ls.set('login_token', responseobj.token);
            }
            return responseobj;
          })
        );
    } else if (method == 'get') {
      return this.http
        .get(url, { headers: httpHeaderValue, observe: 'response' })
        .pipe(
          timeout(environment.API_TIMEOUT),
          catchError((e, c) => {
            return throwError(e);
          }),
          map((response: any) => {
            var responseobj = JSON.parse(JSON.stringify(response.body));
            responseobj.status = response.status;
            if (responseobj.token != undefined) {
              ls.set('login_token', responseobj.token);
            }
            return responseobj;
          })
        );
    } else {
      return this.http
        .post(url, data, { headers: httpHeaderValue, observe: 'response' })
        .pipe(
          timeout(environment.API_TIMEOUT),
          catchError((e, c) => {
            return throwError(e);
          }),
          map((response: any) => {
            if (response.status == 204) {
              return response;
            }
            var responseobj = JSON.parse(JSON.stringify(response.body));
            responseobj.status = response.status;
            if (responseobj.token != undefined) {
              ls.set('login_token', responseobj.token);
            }
            return responseobj;
          })
        );
    }
  }

  DeleteAdminUserInfoFromLocalStorage() {
    ls.remove('login_token');
  } //.End of DeleteAdminUserInfoFromLocalStorage()

  HandleErrorCode(err: any, callback: any = null) {
    let StatusCode: number = err.status;
    let ERROR_REDIRECT = environment.ERROR_REDIRECT;
    if (err.status == 401) {
      StatusCode = 401;
      this.DeleteAdminUserInfoFromLocalStorage();
      this.router.navigate(['/login']);
    } else if (err.status == 404 && ERROR_REDIRECT == true) {
      this.router.navigate(['/page-not-found']);
    } else if (err.status == 500 && ERROR_REDIRECT == true) {
      this.router.navigate(['/internal-server-error']);
    }
    //return StatusCode;
  } //.End of HandleError()

  HandleSuccessCode(result: any, callback: any = null) {
    let StatusCode: number = result.status;
    if (result.status == 202) {
      StatusCode = 202;
      ls.set('login_token', result.response.token);
    }
    //return StatusCode;
  } //.End of HandleSuccessCode()

  GetUserInfoFromLocalStorage() {
    return ls.get('login_token');
  }
}
