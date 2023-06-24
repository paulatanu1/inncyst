import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ResetEmailOtpService {

  constructor(private api:ApiService) { }


  resetEmail(email:string){
    let url:string = '/auth/reset-email-otp';

    const form_data:any = new Object();
    form_data.email = email;

    return this.api.ApiCallWithLocalization(form_data,url,'post')
  }
}
