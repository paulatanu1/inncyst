import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';
import ls from 'localstorage-slim';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private api: ApiService) { 
  }
  getAllJobDetails(detail:any,url:any){
    return this.api.ApiCallWithLocalization('', url, 'get');
  }

  uploadResume(data:any){
    let url='/student/upload-resume'
    const form_data = new FormData();
    form_data.append('jobId',data.jobId)
    form_data.append('resume',data.resume)
    return this.api.ApiCallWithLocalization(form_data,url,'post')
  }
  applyJob(details:any){
    let url= '/student/apply-job';
    return this.api.ApiCallWithLocalization(details,url,'post')
  }
 getJobDetails(id:any){
  let url ='/job/jobs/'+id
  return this.api.ApiCallWithLocalization('',url,'get')
 } 
}
