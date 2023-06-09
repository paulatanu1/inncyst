import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private api:ApiService) { }

  sendRegistrationRequest(userName:string,userEmail:string,phoneNumber:string,password:string,userRole:string){


    let url= '/auth/register';
    // const payload = new FormData()
    //   payload.append('name',userName as string),
    //   payload.append('email',userEmail as string),
    //   payload.append('phone',phoneNumber as string),
    //   payload.append('password',password as string)
    //   payload.append('role',userRole.toLowerCase() as string)

    const form_data:any = new Object();
    form_data.name = userName;
    form_data.email = userEmail;
    form_data.phone = phoneNumber;
    form_data.password = password;
    form_data.userRole = userRole

    return this.api.ApiCallWithLocalization(form_data, url, 'post')
  }
}
