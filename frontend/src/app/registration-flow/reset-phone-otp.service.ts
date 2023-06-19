import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPhoneOtpService {

  constructor(private api:ApiService) { }

  resetPhone(phone:string){
    let url:string = '/auth/reset-phone-otp';

    const form_data:any = new Object();
    form_data.phone = phone;

    return this.api.ApiCallWithLocalization(form_data,url,'post')
  }
}
