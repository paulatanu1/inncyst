import { Injectable } from '@angular/core';
import { Ipayload, IpostJob } from './jobs-managemant-model';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class JobPostApiService {
  constructor(private apiCall: ApiService) {}

  fetchSkills() {
    let url = '/industry/skills';
    return this.apiCall.ApiCallWithLocalization('', url, 'get');
  }

  submitJob(payloadObj: IpostJob) {
    let url = '/industry/add-post';
    const payloadData: Ipayload = {
      type: '',
      salary: 0,
      salaryType: '',
      perks: '',
      skills: [],
      details: '',
      intranshipType: '',
      startDate: '',
      duration: '',
      jobOpening: 0,
      responsibilities: [],
      stipend: '',
      id: '',
      location: '',
      durationIn: '',
      experienceTime: '',
      education: '',
      experience: 0,
    };
    payloadData.type = payloadObj.type;
    payloadData.details = payloadObj.details;
    payloadData.skills = payloadObj.skills;
    payloadData.intranshipType = payloadObj.intranshipType;
    payloadData.startDate = payloadObj.startDate;
    payloadData.duration = payloadObj.duration;
    payloadData.jobOpening = payloadObj.jobOpening;
    payloadData.responsibilities = payloadObj.responsibilities;
    payloadData.stipend = payloadObj.stipend;
    payloadData.salary = +payloadObj.salary;
    payloadData.salaryType = payloadObj.salaryType;
    payloadData.perks = payloadObj.perks;
    payloadData.id = payloadObj.id;
    payloadData.location = payloadObj.location;
    payloadData.durationIn = payloadObj.durationIn;
    payloadData.experienceTime = payloadObj.experienceTime;
    payloadData.education = payloadObj.education;
    payloadData.experience = payloadObj.experience;

    return this.apiCall.ApiCallWithLocalization(payloadData, url, 'put');
  }
  internshipSubmit(data: any) {
    let url = '/industry/submit-post';
    return this.apiCall.ApiCallWithLocalization(data, url, 'post');
  }

  saveJob(payloadObj: any) {
    let url = '/industry/add-post';
    return this.apiCall.ApiCallWithLocalization(payloadObj, url, 'post');
  }

  saveJob2(payloadObj: any) {
    let url = '/industry/add-post';
    return this.apiCall.ApiCallWithLocalization(payloadObj, url, 'post');
  }
  editedJob(id: any, payloadObj: any) {
    let url = '/industry/post-edit/' + id;
    return this.apiCall.ApiCallWithLocalization(payloadObj, url, 'put');
  }
}
