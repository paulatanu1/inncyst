import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class InternshipProfileService {

  constructor(private api:ApiService) {
    
   }
   sendInternshipProfileRequest(){
    let url= '/intranship/intranships';
    const form_data:any = new Object();
      return this.api.ApiCallWithLocalization(form_data,url,'get')
   }
}
