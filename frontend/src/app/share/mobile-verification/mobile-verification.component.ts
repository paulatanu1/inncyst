import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpVerificationService } from '../registration-otp/otp-verification.service';
import { SocialAuthService } from 'src/app/service/social-auth.service';
import { RegistrationService } from 'src/app/registration-service/registration.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
export interface Iglobaldata {
  success: boolean;
  data: Data;
  message: string;
  LOGIN_TYPE: string;
  token: string;
  status: number;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface Data {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  description: any;
  verified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  question_step: boolean;
  location: any;
  skills: any[];
  status: boolean;
  dob: any;
  age: any;
  areaOfInterest: any;
  branch: any;
  gender: string;
  institution: any;
  semester: any;
  stream: any;
  createdAt: string;
  __v: number;
}

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.scss'],
})
export class MobileVerificationComponent implements OnInit {
  @ViewChild('ngOtpInput1') ngOtpInput1: any;
  isphoneOtp: string = '';
  verifyOTP!: FormGroup;
  verifyPhoneNumber!: FormGroup;
  userMobileNumber = '';
  mobileVerification = true;
  globalData: any;
  currentMobileNumber: any;
  constructor(
    private fb: FormBuilder,
    private otpVerifivation: OtpVerificationService,
    private auth: SocialAuthService,
    private reg: RegistrationService,
    private _toast: ToastServiceService,
    private router: Router
  ) {
    this.verifyOTP = this.fb.group({
      phoneOtp: [null, [Validators.required, Validators.pattern(/^\d{4}$/)]],
    });

    this.verifyPhoneNumber = this.fb.group({
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
    });
  }

  ngOnInit(): void {
    this.auth.loginGlobalData.subscribe({
      next: (res) => {
        console.log(res, 'resss11');
        this.globalData = res;
        if (typeof res === 'object' && res !== null) {
          console.log('value');
          let response = res as Iglobaldata;
          if (response.data.phoneVerified === false) {
          }
        } else {
          this.auth.logout();
        }
      },
    });
  }

  onPhoneOtpChange(event: any) {
    this.isphoneOtp = event;
    this.verifyOTP.get('phoneOtp')?.setValue(event);
  }

  onSubmitOtp() {
    let payload = {
      phone: this.verifyPhoneNumber.value,
      otp: this.verifyOTP.value,
    };
    this.reg.phoneVerifyOTP(payload).subscribe({
      next: (res) => {
        if (res.data.role == 'candidate') {
          this.router.navigateByUrl('jobs/posts');
        } else if (res.data.role == 'industry') {
          this.router.navigate(['industry']);
          if (
            res.data.role === 'industry' &&
            this.globalData.data.question_step == false
          ) {
            this.router.navigateByUrl('/industry/profile');
          }
        }
        // this._toast.showToaster.next({
        //   severity: 'success',
        //   summary: 'success',
        //   detail: res.response.message,
        // });
      },
      error: (err) => {
        console.log(err, 'err');
        this._toast.showToaster.next({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
      },
    });
  }

  sendOTP() {
    // console.log(this.verifyPhoneNumber.value['phoneNumber']);
    this.currentMobileNumber = this.verifyPhoneNumber.value['phoneNumber'];
    this.reg
      .verifyPhone(this.verifyPhoneNumber.value['phoneNumber'])
      .subscribe({
        next: (res) => {
          this.mobileVerification = false;
        },
        error: (err) => {
          this._toast.showToaster.next({
            severity: 'error',
            summary: 'error',
            detail: 'Please try again',
          });
          this.auth.logout();
        },
      });
  }

  logout() {
    this.auth.logout();
  }
}
