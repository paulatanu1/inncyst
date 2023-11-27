import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class InternshipProfileService {
  public customHeader = new Subject()
  constructor(private api: ApiService) {}
  sendInternshipProfileRequest() {
    let url = '/auth/me';
    // const form_data:any = new Object();
    return this.api.ApiCallWithLocalization('', url, 'get');
  }

  EditProfile(data:any){
    const form_data:any = new Object();
    form_data.name=data.name
    form_data.email=data.email;
    form_data.image=data.image;
    form_data.phone=data.phone;
    form_data.skills=data.skills;
    form_data.location=data.location;
    form_data.description=data.shortDescription
    let url='/auth/edit-profile'
  return this.api.ApiCallWithLocalization(form_data,url,'put')
}
}
