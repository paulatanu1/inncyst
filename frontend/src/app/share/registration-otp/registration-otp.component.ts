import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { OtpVerificationService } from './otp-verification.service';

import ls from 'localstorage-slim';
import { HeaderService } from '../module-service/header.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/registration-service/registration.service';
import { regResponse } from '../models/register.model';
import { AuthService } from '@auth0/auth0-angular';
import { SocialAuthService } from 'src/app/service/social-auth.service';

@Component({
  selector: 'app-registration-otp',
  templateUrl: './registration-otp.component.html',
  styleUrls: ['./registration-otp.component.scss'],
})
export class RegistrationOtpComponent implements OnInit {
  @ViewChild('ngOtpInput1') ngOtpInput1: any;
  @ViewChild('ngOtpInput2') ngOtpInput2: any;
  isphoneOtp: string = '';
  isemailOtp: string = '';
  registration_id: any = '';
  otpSet: { email: string; phone: string; registrationId: string } = {
    email: '',
    phone: '',
    registrationId: '',
  };
  verifyRegistration!: FormGroup;
  regId: string | undefined = undefined;
  isPhoneVerify: boolean = false;
  isEmailVerify: boolean = false;
  userEmails: string = '';
  userMobileNumber: string = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private otpVerifivation: OtpVerificationService,
    private _header: HeaderService,
    private _toast: ToastServiceService,
    private reg: RegistrationService,
    private auth: SocialAuthService,
    private cd: ChangeDetectorRef
  ) {
    this.verifyRegistration = this.fb.group({
      emailOtp: [null, [Validators.required, Validators.pattern(/^\d{4}$/)]],
      phoneOtp: [null, [Validators.required, Validators.pattern(/^\d{4}$/)]],
    });
  }

  ngAfterViewInit() {
    // this.isOtp = false;
  }

  ngOnInit(): void {
    console.log('iiii');

    this.reg.loginResponse.subscribe({
      next: (resp) => {
        console.log(resp);
        const response = resp as regResponse;
        this.regId = response.data._id;
        this.isPhoneVerify = response.data.phoneVerified;
        this.isEmailVerify = response.data.emailVerified;
        this.userEmails = response.data.email;
        this.userMobileNumber = response.data.phone;
        console.log(this.isEmailVerify, 'vvv');
      },
    });
  }

  onEmailOtpChange(event: any) {
    console.log('otppp');
    this.isemailOtp = event;
    this.verifyRegistration.get('emailOtp')?.setValue(event);
  }
  onPhoneOtpChange(event: any) {
    this.isphoneOtp = event;
    this.verifyRegistration.get('phoneOtp')?.setValue(event);
  }

  resendOtp(type: string) {
    if (type === 'email') {
      this.reg.resendEmailOtp().subscribe({
        next: (res) => {
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.message,
          });
        },
        error: (err) => {
          this._toast.showToaster.next({
            severity: 'error',
            summary: 'error',
            detail: err.message,
          });
        },
      });
    } else {
      this.reg.resendPhoneOtp().subscribe({
        next: (res) => {
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.message,
          });
        },
        error: (err) => {
          this._toast.showToaster.next({
            severity: 'error',
            summary: 'error',
            detail: err.message,
          });
        },
      });
    }
  }

  onSubmitOtp() {
    if (this.verifyRegistration.valid) {
      const otpData = this.verifyRegistration.value;
      console.log(otpData);
      this.otpVerifivation.otpSubmit(otpData).subscribe({
        next: (res) => {
          ls.set('logged', true);
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.message,
          });
        },
        error: (err) => {},
      });
    }
  }

  logout() {
    this.auth.logout();
  }
}
