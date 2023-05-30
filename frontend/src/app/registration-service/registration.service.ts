import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private api:ApiService) { }

  sendRegistrationRequest(){

    const form_data: any = new Object();

    
      form_data.name = 'Atanu123',
      form_data.email = 'atanupaul22@gamil.com',
      form_data.phone =  '9999999999',
      form_data.password = '123456789',
      form_data.role = 'intern'

    return this.api.ApiCallWithLocalization(form_data, '/auth/register', 'post')
  }
}
