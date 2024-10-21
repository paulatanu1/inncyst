import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ApiService } from 'src/app/common-service/api.service';
interface Iotpset {
  email: string;
  phone: string;
  registrationId: string | number;
}
@Injectable({
  providedIn: 'root',
})
export class OtpVerificationService {
  registrationData = new Subject();
  constructor(private api: ApiService) {}

  otpSubmit(otpSet: Iotpset) {
    let url: string = '/auth/verify';
    const payload: any = new Object();
    payload.otp_email = otpSet.email;
    payload.otp_phone = otpSet.phone;
    payload.id = otpSet.registrationId;

    return this.api.ApiCallWithLocalization(payload, url, 'post');
  }

  forgotPasswordOtpSubmit(otpSet: { email: string; otp: string }) {
    let url: string = '/auth/email-otp-verify';
    const form_data: any = new Object();
    form_data.email = otpSet.email;
    form_data.otp = otpSet.otp;
    return this.api.ApiCallWithLocalization(form_data, url, 'post');
  }
  public logoutSuccess = new Subject();
  public loginflow = new Subject();
}
