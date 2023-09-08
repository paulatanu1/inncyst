import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/common-service/api.service';

interface IformData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  url: string = '';
  constructor(private api: ApiService) {}
  public loginModal = new Subject();
  public forgotPassword = new Subject();
  public forgotPasswordOtp = new Subject();
  public resetPassword = new Subject();

  login(userEmail: string, password: string, userRole: string) {
    this.url = '/auth/login';
    // const form_data: IformData = new Object();
    // const payload = new FormData()
    //   payload.append('email',userEmail as string),
    //   payload.append('password',password as string)
    //   payload.append('role',userRole.toLowerCase() as string)

    const form_data: any = new Object();
    form_data.email = userEmail;
    form_data.password = password;
    form_data.role = userRole.toLowerCase() as string;

    return this.api.ApiCallWithLocalization(form_data, this.url, 'post');
  }
  forgetpassword(email: string) {
    this.url = '/auth/forget-password';
    const form_data:any = new Object();
    form_data.email=email;
    return this.api.ApiCallWithLocalization(form_data, this.url, 'post');
  }

}
