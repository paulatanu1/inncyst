import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private api: ApiService) { 

    
  }
  profile(data:any){
    let url='/industry/industry-question'
    return this.api.ApiCallWithLocalization(data,url,'post')
  }
EditProfile(data:any,id:any){
  let url = '/industry/industry-question/'+id
  return this.api.ApiCallWithLocalization(data,url,'post')
}
  getProfile(){
    let url='/industry/profile'
    return this.api.ApiCallWithLocalization('',url,'get')
  }
}
