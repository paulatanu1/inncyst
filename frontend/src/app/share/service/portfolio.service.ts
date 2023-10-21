import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private api:ApiService) { }

  addPortfolio(data:any){
    let url="/auth/user/portfolio";
    return this.api.ApiCallWithLocalization(data,url,'post')
  }
  getPortfolio(){
    let url="/auth/user/portfolio";
    return this.api.ApiCallWithLocalization('',url,'get')
  }
}
