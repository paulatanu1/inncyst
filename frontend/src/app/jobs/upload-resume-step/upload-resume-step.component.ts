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
  resumeUploadSucess!: boolean;
  // fileName!:string;
  constructor(
    private loginDetails: LoginDetailsService,
    private _toast: ToastServiceService,
    private jobService: JobsService,
    private router:Router,
    private api:ApiService,
    private internship: InternshipProfileService
  ) {}

  ngOnInit(): void {
    // this.userLoginDetails = ls.get('loginDetails');
    // console.log(this.userLoginDetails);

    this.internship.sendInternshipProfileRequest().subscribe({
      next:(res=>{
        this.userLoginDetails=res.data;
        console.log(this.userLoginDetails)
      })
    })
  }
  addTextArea() {
    this.availability = '1';
    this.inputFieldEnable = !this.inputFieldEnable;
  }
  onFileSelected(event: any) {
    console.log(event)
    this.selectedFile = event.target.files[0];
     this.fileName=this.selectedFile.name
    console.log(this.selectedFile);
  }

  // save(data: Data, filesForUpload: File[]): Observable<Data> {
  //   const formData = new FormData();

  //   // add the files
  //   if (filesForUpload && filesForUpload.length) {
  //     filesForUpload.forEach(file => formData.append('files', file));
  //   }

  //   // add the data object
  //   formData.append('data', new Blob([JSON.stringify(data)], {type: 'application/json'}));

  //   return this.http.post<Data>(this.apiUrl, formData);
  // }
  uploadFile() {
    if (!this.selectedFile) {
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'error',
        detail: 'No file selected',
      });
      return;
    } else {
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   this.base64 = reader.result as string;
      //   console.log('Base64 PDF:', this.base64);
      // };
      // reader.readAsDataURL(this.selectedFile);
      console.log(this.selectedFile);
      let url='/student/upload-resume'
      const form_data:any = new FormData();
      form_data.append('jobId','64fd77665810ffdaf7e9b5b2')
       form_data.append('resume', this.selectedFile)
      // {
      //   jobId: this.jobId,
      //   resume: this.selectedFile,
      // };
      return this.api.ApiCallWithLocalization(form_data,url,'post').subscribe({
        next:((res:any)=>{
          console.log(res)
        })
      })
      this.jobService.uploadResume(form_data).subscribe({
        next: ((res:any) => {
          console.log(res);
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.success,
          });
          this.resumeUploadSucess = true;
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
    }
  }
  submitApplication() {
    // let details = {
    //   email: this.userLoginDetails.email,
    //   phone: this.userLoginDetails.phone,
    //   availability: this.availability,
    //   availability_message: this.availability_messageValue,
    //   jobId: '64fd77665810ffdaf7e9b5b2',
    // };
    // console.log(details);
    // if (this.resumeUploadSucess) {
      // this.jobService.applyJob(details).subscribe({
      //   next: (res:any) => {
      //     console.log(res);
      //     this._toast.showToaster.next({
      //       severity: 'success',
      //       summary: 'success',
      //       detail: res.success,
      //     });
      //   },
      //   error: (res:any) => {
      //     console.log(res);
        
      //       this._toast.showToaster.next({
      //         severity: 'error',
      //         summary: 'error',
      //         detail:'Please upload a resume',
      //       });
        
      //   },
      // },

      
      // );
    // }
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
