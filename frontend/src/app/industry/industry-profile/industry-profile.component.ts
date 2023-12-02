import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../jobs-management/jobs-management-service/profile.service';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/service/toast-service.service';

@Component({
  selector: 'app-industry-profile',
  templateUrl: './industry-profile.component.html',
  styleUrls: ['./industry-profile.component.scss'],
})
export class IndustryProfileComponent implements OnInit {
  profileForm!: FormGroup;
  submitButton = false;
  profileData:any = {};
  constructor(
    private fb: FormBuilder,
    private _ProfileService: ProfileService,
    private router: Router,
    private _toast: ToastServiceService
  ) {
    this.getProfile();
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      companyName: [''],
      companyEstdYear: [undefined],
      aboutCompany: [''],
      empCount: [undefined],
      workPlace: [''],
    });
  }
  submitForm() {
    console.log(this.profileForm.value);
    const form_Data = new Object();
    // form_Data.app
    if(!this.profileData.industryId.question_step){

      this._ProfileService.profile(this.profileForm.value).subscribe({
        next: (res) => {
          console.log(res);
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
    else{
      this._ProfileService.EditProfile(this.profileForm.value,this.profileData._id).subscribe({
        next:(res)=>{
          console.log(res,'edit')
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
      })
    }
  }
  getProfile() {
    this._ProfileService.getProfile().subscribe({
      next: (res) => {
        // console.log(res);
        this.profileData = res.data;
        this.profileForm.get('companyName')?.setValue(res.data.companyName);
        this.profileForm
          .get('companyEstdYear')
          ?.setValue(res.data.companyEstdYear);
        this.profileForm.get('aboutCompany')?.setValue(res.data.aboutCompany);
        this.profileForm.get('empCount')?.setValue(res.data.empCount);
        this.profileForm.get('workPlace')?.setValue(res.data.workPlace);
        this.profileForm.disable();
      },
    });
  }
  editProfile() {
    this.submitButton = true;
    this.profileForm.enable();
  }
}
