import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  loginResponse = new Subject();
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
