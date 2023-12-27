import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/common-service/api.service';

interface payload {
  type: string;
  details: string;
  skills: string[];
  intranshipType: string;
  startDate: string;
  duration: string;
  jobOpening: number;
  responsibilities: string[];
  stipend: string;
  salary: number;
  salaryType: string;
  perks: string;
}
@Injectable({
  providedIn: 'root',
})
export class JobListApiService {
  constructor(private api: ApiService) {}
  addJob(
    type: string,
    details: string,
    skills: string[],
    intranshipType: string,
    startDate: string,
    duration: string,
    jobOpening: number,
    responsibilities: string[],
    stipend: string,
    salary: number,
    salaryType: string,
    perks: string
  ) {
    const url = '/industry/add-post';
    const form_data: payload = {
      type: type,
      details: details,
      skills: skills,
      intranshipType: intranshipType,
      startDate: startDate,
      duration: duration,
      jobOpening: jobOpening,
      responsibilities: responsibilities,
      stipend: stipend,
      salary: salary,
      salaryType: salaryType,
      perks: perks,
    };

    return this.api.ApiCallWithLocalization(form_data, url, 'post');
  }
  editStudentStatus(id:any,data:any){
    let url='/industry/student-application-status/'+id
    return this.api.ApiCallWithLocalization(data,url,'put')
  }
getAppliedStudent(id:any){
  let url='/industry/applied-student/'+id;
  return this.api.ApiCallWithLocalization('',url,'get')
}
}
