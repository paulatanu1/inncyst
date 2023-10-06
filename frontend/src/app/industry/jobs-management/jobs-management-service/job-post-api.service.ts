import { Injectable } from '@angular/core';
import { Ipayload, IpostJob } from './jobs-managemant-model';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class JobPostApiService {
  constructor(private apiCall: ApiService) {}

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
    };
    console.log(payloadObj, 'payloadObj');

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

    console.log(payloadData);

    return this.apiCall.ApiCallWithLocalization(payloadData, url, 'put');
  }

  saveJob(payloadObj:any){
    let url = '/industry/add-post';
    console.log(payloadObj);
 const formData ={
   type :payloadObj.type,
   details:payloadObj.details,
   skills:payloadObj.skills,
   startDate:payloadObj.startDate,
   duration:payloadObj.duration,
   jobOpening:payloadObj.jobOpening,
   responsibilities:payloadObj.responsibilities,
   stipend:payloadObj.stipend,
   salary:+payloadObj.salary,
   salaryType:payloadObj.salaryType,
   perks:payloadObj.perks,
   intranshipType:payloadObj.intranshipType
 }
    console.log(payloadObj, 'payloadObj');


    return this.apiCall.ApiCallWithLocalization(formData,url,'post')
  }
}
