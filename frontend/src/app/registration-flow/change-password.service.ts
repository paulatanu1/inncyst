import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private api:ApiService) { }

  resetPassword(oldPassword:string,newPassword:string){
    let url:string = '/auth/change-password';

    const form_data:any = new Object();
    form_data.old_password = oldPassword;
    form_data.new_password = newPassword;

    return this.api.ApiCallWithLocalization(form_data,url,'post')
  }
}
