import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import ls from 'localstorage-slim';
import { ApiService } from 'src/app/common-service/api.service';
import { LoginDetailsService } from 'src/app/common-service/login-details.service';
// import { LoginDetailsService } from 'src/app/common-service/login-details.service';
import { JobsService } from 'src/app/service/jobs.service';
// import { JobsService } from 'src/app/service/jobs.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { LoginApiService } from 'src/app/share/login/login-api.service';
import { InternshipProfileService } from 'src/app/share/service/internship-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-resume-step',
  templateUrl: './upload-resume-step.component.html',
  styleUrls: ['./upload-resume-step.component.scss'],
})
export class UploadResumeStepComponent implements OnInit {
  availability!: string;
  availability_message!: string;
  availability_messageValue!: string;
  userLoginDetails: any;
  inputFieldEnable: boolean = false;
  selectedFile!: File;
  fileName!: string;
  base64!: string;
  jobId: any;
  appliedJobId!:string;
  resumeUploadSucess: boolean=false;
  // fileName!:string;
  constructor(
    private loginDetails: LoginDetailsService,
    private _toast: ToastServiceService,
    private jobService: JobsService,
    private router:Router,
    private api:ApiService,
    private internship: InternshipProfileService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
// this.jobService.sendSelectedJobId().subscribe({
//   next:(res=>{
//     this.appliedJobId=<string>res;
//     alert(res)
//   })
// })
this.activatedRoute.params.subscribe({
  next:(res=>{
    this.appliedJobId=res['id']
  })}
)
    this.internship.sendInternshipProfileRequest().subscribe({
      next:(res=>{
        this.userLoginDetails=res.data;
        this.jobId=res.data._id
        console.log(this.userLoginDetails,'logindetails')
      })
    })
  }
  addTextArea() {
    this.availability = '1';
    this.inputFieldEnable = !this.inputFieldEnable;
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
     this.fileName=this.selectedFile.name;
     this.convertToBase64();
    // console.log(this.selectedFile);
  }

  convertToBase64() {
    if (!this.selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e:any) => {
      this.base64 = e.target.result as string;
      console.log(this.base64);
    };

    reader.readAsDataURL(this.selectedFile);
  }
  uploadFile() {
    if (!this.base64) {
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'error',
        detail: 'No file selected',
      });
      return;
    } else {
    
      const form_data:any = new Object();
      alert(this.appliedJobId)
      form_data.jobId=this.appliedJobId;
      form_data.resume=this.base64;
      console.log(form_data,'jobId')
      this.jobService.uploadResume(form_data).subscribe({
        next: ((res:any) => {
          console.log(res);
          this.resumeUploadSucess = true;
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.message,
          });
         
        }),
        error:((err:any)=>{
          this._toast.showToaster.next({
            severity: 'error',
            summary: 'error',
            detail: err.success,
          });
        })
      });
      return this.selectedFile;
    }}

  submitApplication() {

    let details = {
      email: this.userLoginDetails.email,
      phone: this.userLoginDetails.phone,
      availability: this.availability,
      availability_message: this.availability_messageValue,
      jobId: this.appliedJobId,
    };
    console.log(details);
    if (this.resumeUploadSucess) {
      this.jobService.applyJob(details).subscribe({
        next: (res:any) => {
          console.log(res);
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.success,
          });
          this.jobService.afterSuccessApplyJobCloseModal.next(true);
        },
        error: (res:any) => {
          console.log(res);
        
            this._toast.showToaster.next({
              severity: 'error',
              summary: 'error',
              detail:res.error.message?res.error.message:'Please upload a resume',
            });
        
        },
      },

      
      );
    }
  }
  addavailability() {
    this.availability = '0';
    this.availability_messageValue = '';
    this.inputFieldEnable = false;
  }
  back(){
    this.router.navigate(['jobs/internships/skills']);
  }
}
