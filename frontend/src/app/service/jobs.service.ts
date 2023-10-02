import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';
import ls from 'localstorage-slim';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private api: ApiService) { 
  }

  public afterSuccessApplyJobCloseModal= new Subject();
  getAllJobDetails(detail:any,url:any){
    return this.api.ApiCallWithLocalization('', url, 'get');
  }

  uploadResume(data:any){
    console.log(data)
    let url='/student/upload-resume-demo'
    // const form_data:any = new FormData();
    // // let id='64fd77665810ffdaf7e9b5b2'
    // form_data.append('jobId',data.jobId)
    // // form_data.
    // form_data.append('resume',data.base64)
    // console.log(form_data,'form_data')
    return this.api.ApiCallWithLocalization(data,url,'post')
  }
  applyJob(details:any){
    let url= '/student/apply-job';
    console.log(details)
    return this.api.ApiCallWithLocalization(details,url,'post')
  }
 getJobDetails(id:any){
  let url ='/job/jobs/'+id
  return this.api.ApiCallWithLocalization('',url,'get')
 } 

 applyedJobDetails(){
let url = '/student/job-list'
return this.api.ApiCallWithLocalization('',url,'get')
 }

 public sendMyJobDetails = new Subject()
jobDetails:any;
 sendAppliedJobId(a:any){
  this.jobDetails=a
// return this.jobDetails
 }
 getAppliedJobId(){
  return of(this.jobDetails)
 }
getAppliedJobDetails(id:any){
  let url='/student/job/'+id
  return this.api.ApiCallWithLocalization('',url,'get')
}

}
