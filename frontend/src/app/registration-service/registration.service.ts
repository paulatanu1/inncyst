import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private api:ApiService) { }

  sendRegistrationRequest(userName:string,userEmail:string,phoneNumber:string,password:string,userRole:string){


    let url= '/auth/register';
    const payload = new FormData()
      payload.append('name',userName as string),
      payload.append('email',userEmail as string),
      payload.append('phone',phoneNumber as string),
      payload.append('password',password as string)
      payload.append('role',userRole.toLowerCase() as string)

    return this.api.ApiCallWithLocalization(payload, url, 'post')
  }
}
