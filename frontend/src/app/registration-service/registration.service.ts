import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private api:ApiService) { }

  sendRegistrationRequest(userName:string,userEmail:string,phoneNumber:string,password:string,userRole:string){
    let url= '/auth/register';
    const form_data:any = new Object();
    form_data.name = userName;
    form_data.email = userEmail;
    form_data.phone = phoneNumber.toString();
    form_data.password = password;
    form_data.role = userRole
    return this.api.ApiCallWithLocalization(form_data, url, 'post')
  }
}
