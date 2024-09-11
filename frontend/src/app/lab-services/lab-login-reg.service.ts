interface FacilityFormData {
  facilityName: string;
  category: string;
  description: string;
  modelNumber: string;
  make: string;
  yearOfManufacture: number;
  technicalSpecifications: string;
  userManual: File; // or string if you're using a URL
  guidelines: string;
}
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

  createFacility(formData: any) {
    let apiUrl = '/lab/facilities/create-facility';

    return this.apiService.ApiCallWithLocalization(formData, apiUrl, 'POST');
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
    let apiUrl = '/lab/facilities/facility-list';
    let payload = {};
    return this.apiService.ApiCallWithLocalization(payload, apiUrl, 'POST');
  }
}
