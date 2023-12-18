import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../jobs-management/jobs-management-service/profile.service';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-industry-profile',
  templateUrl: './industry-profile.component.html',
  styleUrls: ['./industry-profile.component.scss'],
})
export class IndustryProfileComponent implements OnInit {
  profileForm!: FormGroup;
  submitButton = false;
  profileData: any = {};
  selectedFile!: File;
  base64: any;
  fileName!: string;
  questionStep: any;
  id: any;
  constructor(
    private fb: FormBuilder,
    private _ProfileService: ProfileService,
    private router: Router,
    private _toast: ToastServiceService
  ) {
    this.questionStep = ls.get('questionStep');
    if (this.questionStep) {
      this.getProfile();
    }
  }

  ngOnInit(): void {
    this.id = ls.get('id');
    console.log(this.id);
    console.log(this.questionStep);
    this.profileForm = this.fb.group({
      companyName: [''],
      companyEstdYear: [undefined],
      aboutCompany: [''],
      empCount: [undefined],
      workPlace: [''],
      image: [''],
    });
  }
  submitForm() {
    console.log(this.profileForm.value);
    const form_Data = new Object();
    if (!this.questionStep) {
      this._ProfileService
        .EditProfile(this.profileForm.value, this.id)
        .subscribe({
          next: (res) => {
            console.log(res, 'edit');
            this._toast.showToaster.next({
              severity: 'success',
              summary: 'success',
              detail: res.message,
            });
            // this.router.navigateByUrl('/industry/jobs');
            this.submitButton = false;

            this.getProfile();
          },
          error: (err) => {
            this._toast.showToaster.next({
              severity: 'warn',
              summary: 'Warn',
              detail: 'Please Fillup Details',
            });
            // this.router.navigateByUrl('/industry/jobs');
          },
        });
    }
    // form_Data.app
    // if(!this.profileData?.industryId.question_step){

    // }
    // else if(this.profileData.industryId.question_step || this.profileData == null){
    alert('oo');
    if (this.questionStep) {
      this._ProfileService
        .EditProfile(this.profileForm.value, this.profileData._id)
        .subscribe({
          next: (res) => {
            console.log(res, 'edit');
            this._toast.showToaster.next({
              severity: 'success',
              summary: 'success',
              detail: res.message,
            });
            // this.router.navigateByUrl('/industry/jobs');
            this.submitButton = false;

            this.getProfile();
          },
          error: (err) => {
            this._toast.showToaster.next({
              severity: 'warn',
              summary: 'Warn',
              detail: 'Please Fillup Details',
            });
            // this.router.navigateByUrl('/industry/jobs');
          },
        });
    }
  }
  getProfile() {
    this._ProfileService.getProfile().subscribe({
      next: (res) => {
        console.log(res);
        this.profileData = res.data;
        this.questionStep = res.data?.industryId.question_step;
        console.log(this.profileData);
        if(this.profileData){
          
          this.profileForm.get('companyName')?.setValue(res.data?.companyName);
          this.profileForm
            .get('companyEstdYear')
            ?.setValue(res.data?.companyEstdYear);
          this.profileForm.get('aboutCompany')?.setValue(res.data?.aboutCompany);
          this.profileForm.get('empCount')?.setValue(res.data?.empCount);
          this.profileForm.get('workPlace')?.setValue(res.data?.workPlace);
          this.profileForm.get('image')?.setValue(res.data?.image);
          this.profileForm.disable();
        }
        if(!this.profileData){
          this.profileForm.enable();
        }
      },
    });
  }
  editProfile() {
    this.submitButton = true;
    this.profileForm.enable();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
    this.convertToBase64();
    // console.log(this.selectedFile);
  }

  convertToBase64() {
    if (!this.selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.base64 = e.target.result as string;
      console.log(this.base64, 'b64');
      this.profileForm.get('image')?.patchValue(this.base64);
    };

    reader.readAsDataURL(this.selectedFile);
  }

  addPortfolio() {
    console.log(this.profileForm.value);
    this._ProfileService.profile(this.profileForm.value).subscribe({
      next: (res) => {
        console.log(res);
        ls.remove('questionStep');
        ls.set('questionStep', res.data);
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
        // this.router.navigateByUrl('/industry/jobs');
        this.submitButton = false;

        this.getProfile();
      },
      error: (err) => {
        this._toast.showToaster.next({
          severity: 'warn',
          summary: 'Warn',
          detail: 'Please Fillup Details',
        });
        // this.router.navigateByUrl('/industry/jobs');
      },
    });
  }
}
