import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';
interface Iotpset{
  email:number | null;
  phone:number | null
}
@Injectable({
  providedIn: 'root'
})
export class OtpVerificationService {

  constructor(private api:ApiService) { }

  otpSubmit(otpSet:Iotpset){
    let url:string = '/auth/verify'
    const payload:any = new Object();
    payload.otp_email = otpSet.email;
    payload.otp_phone = otpSet.phone;

    return this.api.ApiCallWithLocalization(payload,url,'post')
  }
}
