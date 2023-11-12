import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class JobPostListService {
  constructor(private api: ApiService) {}

  getPostList() {
    let url = '/industry/industry-posts?status=&page=0&limit=4';

    return this.api.ApiCallWithLocalization('', url, 'get');
  }
  deletePortFolio(id: any) {
    // let url = '/auth/user/portfolio/' + id;
    let url='/industry/delete-post/'+id;
    return this.api.ApiCallWithLocalization('', url, 'delete');
  }
  getSinglePortfolio(id:any){
    let url = '/industry/industry-posts/' + id;
  return this.api.ApiCallWithLocalization('',url,'get')
  }
  editPortfolio(id:any,data:any){
    let url = '/auth/user/portfolio/' + id;
    return this.api.ApiCallWithLocalization(data,url,'put')
  }
  editStatus(data:any,id:any){
  // const form_data = new formatData(
  let url = '/industry/student-application-status/'+id
  return this.api.ApiCallWithLocalization(data,url,'put')
}
}
