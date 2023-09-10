import { Injectable } from '@angular/core';
import { ApiService } from '../common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private api: ApiService) { }
  
  getAllJobDetails(){
    let url:string='/job/jobs'
    return this.api.ApiCallWithLocalization('', url, 'get');
  }

  applyJob(details:any){
    let url= '/student/apply-job';
    return this.api.ApiCallWithLocalization(details,url,'post')
  }
}
