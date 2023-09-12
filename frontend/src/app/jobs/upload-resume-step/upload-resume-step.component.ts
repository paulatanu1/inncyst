import { Component, OnInit } from '@angular/core';
import ls from 'localstorage-slim';
import { LoginDetailsService } from 'src/app/common-service/login-details.service';
import { JobsService } from 'src/app/service/jobs.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { LoginApiService } from 'src/app/share/login/login-api.service';

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
  value!:string
  resumeUploadSucess!: boolean;
  constructor(
    private loginDetails: LoginDetailsService,
    private _toast: ToastServiceService,
    private jobService: JobsService
  ) {}

  ngOnInit(): void {
    this.userLoginDetails = ls.get('loginDetails');
    console.log(this.userLoginDetails);
  }
  addTextArea() {
    this.availability = '1';
    this.inputFieldEnable = !this.inputFieldEnable;
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
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
      let data = {
        jobId: this.jobId,
        resume: this.selectedFile,
      };
      this.jobService.uploadResume(data).subscribe({
        next: (res) => {
          console.log(res);
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.success,
          });
          this.resumeUploadSucess = true;
        },
      });
      return this.selectedFile;
    }
  }
  submitApplication() {
    let details = {
      email: this.userLoginDetails.email,
      phone: this.userLoginDetails.phone,
      availability: this.availability,
      availability_message: this.availability_messageValue,
      jobId: this.jobId,
    };
    console.log(details);
    if (this.resumeUploadSucess) {
      this.jobService.applyJob(details).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (res) => {
          console.log(res);
        },
      });
    }
  }
  addavailability() {
    this.availability = '0';
    this.availability_messageValue = '';
    this.inputFieldEnable = false;
  }
}
