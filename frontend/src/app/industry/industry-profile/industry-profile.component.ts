import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../jobs-management/jobs-management-service/profile.service';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import ls from 'localstorage-slim';
import { LeftMenuHandelService } from '../left-menu-handel.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-industry-profile',
  templateUrl: './industry-profile.component.html',
  styleUrls: ['./industry-profile.component.scss'],
  animations: [
    trigger('buttonAnimation', [
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      transition('visible => hidden', animate('0.5s ease-in-out')),
      transition('hidden => visible', animate('0.5s ease-in-out')),
    ]),
  ],
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
  editProfileData = false;
  openImageUploadButton = false;
  viewProfile = true;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private _ProfileService: ProfileService,
    private router: Router,
    private _toast: ToastServiceService,
    private _menuHandel: LeftMenuHandelService
  ) {
    this.questionStep = ls.get('questionStep');
    if (this.questionStep) {
      this.getProfile();
    }
  }

  ngOnInit(): void {
    this._menuHandel.leftMenuActive.next(3);
    this.id = ls.get('id');
    this.profileForm = this.fb.group({
      companyName: [''],
      companyEstdYear: [undefined],
      aboutCompany: [''],
      empCount: [undefined],
      workPlace: [''],
      image: [''],
      branchOffice: [''],
      corporateOffice: [''],
    });
  }
  submitForm() {
    const form_Data = new Object();
    if (!this.questionStep) {
      this._ProfileService
        .EditProfile(this.profileForm.value, this.id)
        .subscribe({
          next: (res) => {
            this._toast.showToaster.next({
              severity: 'success',
              summary: 'success',
              detail: res.message,
            });
            // this.router.navigateByUrl('/industry/jobs');
            this.submitButton = false;
            this.viewProfile = true;
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
    if (this.questionStep) {
      this._ProfileService
        .EditProfile(this.profileForm.value, this.profileData._id)
        .subscribe({
          next: (res) => {
            this._toast.showToaster.next({
              severity: 'success',
              summary: 'success',
              detail: res.message,
            });
            // this.router.navigateByUrl('/industry/jobs');
            this.submitButton = false;
            this.viewProfile = true;
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
    this.loading = true;
    this._ProfileService.getProfile().subscribe({
      next: (res) => {
        this.profileData = res.data;
        this.questionStep = res.data?.industryId.question_step;
        this._ProfileService.profileImage.next(this.profileData.image);
        this._ProfileService.profileName.next(this.profileData.companyName);
        this.loading = false;
        localStorage.setItem('industry-phone', res.data?.industryId.phone);
        if (this.profileData) {
          this.profileForm.get('companyName')?.setValue(res.data?.companyName);
          this.profileForm
            .get('companyEstdYear')
            ?.setValue(res.data?.companyEstdYear);
          this.profileForm
            .get('aboutCompany')
            ?.setValue(res.data?.aboutCompany);
          this.profileForm.get('empCount')?.setValue(res.data?.empCount);
          this.profileForm.get('workPlace')?.setValue(res.data?.workPlace);
          this.profileForm.get('image')?.setValue(res.data?.image);
          this.profileForm
            .get('branchOffice')
            ?.setValue(res.data?.branchOffice);
          this.profileForm
            .get('corporateOffice')
            ?.setValue(res.data?.corporateOffice);

          this.profileForm.disable();
        }
        if (!this.profileData) {
          this.profileForm.enable();
        }
      },
    });
  }
  editProfile() {
    this.submitButton = true;
    this.profileForm.enable();
    this.editProfileData = true;
    this.viewProfile = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
    this.convertToBase64();
    this.openImageUploadButton = false;
  }

  convertToBase64() {
    if (!this.selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.base64 = e.target.result as string;
      this.profileForm.get('image')?.patchValue(this.base64);
    };

    reader.readAsDataURL(this.selectedFile);
  }

  addPortfolio() {
    this._ProfileService.profile(this.profileForm.value).subscribe({
      next: (res) => {
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
  removeImage() {
    this.profileForm.get('image')?.setValue(null);
    this.openImageUploadButton = true;
  }
}
