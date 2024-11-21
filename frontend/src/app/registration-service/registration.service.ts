import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  loginResponse = new BehaviorSubject(null);
  constructor(private api: ApiService) {}

  sendRegistrationRequest(
    userName: string,
    userEmail: string,
    phoneNumber: string,
    password: string,
    userRole: string
  ) {
    let url = '/auth/register';
    const form_data: any = new Object();
    form_data.name = userName;
    form_data.email = userEmail;
    form_data.phone = phoneNumber.toString();
    form_data.password = password;
    form_data.role = userRole;
    return this.api.ApiCallWithLocalization(form_data, url, 'post');
  }

  resendEmailOtp() {
    let url = '/auth/reset-email-otp';
    let userId = '';
    return this.api.ApiCallWithLocalization('', url, 'PUT');
  }

  verifyPhone(phone: string) {
    let url = '/auth/verify-social-phone';
    let payload = {
      phone: phone,
    };
    return this.api.ApiCallWithLocalization(payload, url, 'post');
  }

  phoneVerifyOTP(payload: any) {
    console.log(payload, 'payload');
    let data = {
      otp: payload.otp['phoneOtp'],
      phone: payload.phone['phoneNumber'],
    };
    let url = '/auth/phone-otp-verify';
    // let data = {phone:payload.phoneOtp}
    return this.api.ApiCallWithLocalization(data, url, 'post');
  }

  resendPhoneOtp() {
    let url = '/auth/reset-phone-otp';
    let userId = '';
    return this.api.ApiCallWithLocalization('', url, 'PUT');
  }

  ssoProcress(role: string, userData: {}, loginType: string) {
    let url = '/auth/social/login';
    let payload = {
      loginType: loginType,
      role: role,
      userdata: userData,
    };
    return this.api.ApiCallWithLocalization(payload, url, 'POST');
  }
}
