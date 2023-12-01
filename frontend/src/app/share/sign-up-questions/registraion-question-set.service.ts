import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/common-service/api.service';
import { Ianswersset } from '../registrationInterface';
interface IquestionSets{

}

@Injectable({
  providedIn: 'root'
})
export class RegistraionQuestionSetService {

  constructor(private api:ApiService) { }

  submitIndustraryQuestionAnswers(answerSet:Ianswersset){
    let url:string = '/industry/industry-question'
    const form_data:any = new Object();
    form_data.industryId = answerSet.id;
    form_data.companyName = answerSet.aboutCompany;
    form_data.companyEstdYear = answerSet.companyEstableYear;
    form_data.aboutCompany = answerSet.companyName;
    form_data.empCount = Number(answerSet.noEmployee);
    form_data.workPlace = answerSet.placeOfWork;
    form_data.salaryPackege = answerSet.salary
    return this.api.ApiCallWithLocalization(form_data,url,'post')
  }

}
