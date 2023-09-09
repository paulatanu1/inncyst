import { Component, OnInit } from '@angular/core';
import { LoginDetailsService } from 'src/app/common-service/login-details.service';
import { LoginApiService } from 'src/app/share/login/login-api.service';

@Component({
  selector: 'app-upload-resume-step',
  templateUrl: './upload-resume-step.component.html',
  styleUrls: ['./upload-resume-step.component.scss']
})
export class UploadResumeStepComponent implements OnInit {
  opt:string='1';
  loginDetails:Object={}
  constructor(private loginSevice:LoginDetailsService) { 

    this.loginSevice.a.subscribe((res=>{
      alert('kkkkkkkkkk')
    }))
  }

  ngOnInit(): void {
//get Login Details
// alert('d')
// this.loginSevice.loginDetails.subscribe(((res:any)=>{
//   alert('f')
// this.loginDetails=<object>res;
// console.log(this.loginDetails)
// }),((er:any)=>{
//   console.log(er)
// }))

  }

}
