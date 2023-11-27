import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private api: ApiService) {}

  addPortfolio(data: any) {
    // const formData = new FormData();
    // formData.append('title',data.title)
    // formData.append('description',data.description)
    // formData.append('id',data.id)
    // formData.append('url',data.url)
    // formData.append('image',data.image)
    // formData.append('pdf',data.pdf)
    // console.log(formData,'data')

    let url = '/auth/user/portfolio';
    return this.api.ApiCallWithLocalization(data, url, 'post');
  }
  getPortfolio() {
    let url = '/auth/user/portfolio';
    return this.api.ApiCallWithLocalization('', url, 'get');
  }
  deletePortFolio(id: any) {
    let url = '/auth/user/portfolio/' + id;
    return this.api.ApiCallWithLocalization('', url, 'delete');
  }
  getSinglePortfolio(id:any){
    let url = '/auth/user/portfolio/' + id;
  return this.api.ApiCallWithLocalization('',url,'get')
  }
  editPortfolio(id:any,data:any){
    let url = '/auth/user/portfolio/' + id;
    return this.api.ApiCallWithLocalization(data,url,'put')
  }
  public hideAddPortfolioModal=new Subject()

  //industry get student list of applied student...........
}
