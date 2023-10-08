import { Injectable } from '@angular/core';
import { IpayloadData } from '../contact-us-model/contact-us-model';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private api: ApiService) {}

  submitContactForm(data: IpayloadData) {
    let url: string = '/contact/contact-us';
    const payload: IpayloadData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    };
    payload.firstName = data.firstName;
    payload.lastName = data.lastName;
    payload.email = data.email;
    payload.message = data.message;
    payload.phone = data.phone;
    return this.api.ApiCallWithLocalization(payload, url, 'post');
  }
}
