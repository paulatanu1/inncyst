import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class LabLoginRegService {
  constructor(private apiService: ApiService) {}

  labRegister() {
    let apiUrl: string = '/lab/register-lab';
    let payload = {
      email: '',
      labName: '',
      contactPerson: '',
      phoneNumbers: '',
      isAccredited: '',
      accreditionValidUpto: '',
      category: '',
      affliation: '',
      labDescription: '',
      labWebsite: '',
      certificate: '',
      logo: '',
    };
    return this.apiService.ApiCallWithLocalization(payload, apiUrl, 'POST');
  }

  createFacility() {
    let apiUrl = '/lab/facilities/create-facility';
    let payload = {
      facilityName: '',
      category: '',
      description: '',
      modelNumber: '',
      make: '',
      yearOfManufacturing: '',
      softwareLicenceDetails: '',
      userManual: '',
      specificGuideline: '',
    };
    return this.apiService.ApiCallWithLocalization(payload, apiUrl, 'POST');
  }

  labLogin() {
    let apiUrl = 'lab/login';
    let payload = {
      email: '',
      password: '',
    };
    return this.apiService.ApiCallWithLocalization(payload, apiUrl, 'POST');
  }

  changeLabPassword() {
    let apiUrl = '/lab/change-password';
    let payload = {
      old_password: '',
      new_password: '',
    };
    return this.apiService.ApiCallWithLocalization(payload, apiUrl, 'POST');
  }

  labFacilityList() {
    let apiUrl = 'lab/facilities/facility-list';
    let payload = {};
    return this.apiService.ApiCallWithLocalization(payload, apiUrl, 'POST');
  }
}
