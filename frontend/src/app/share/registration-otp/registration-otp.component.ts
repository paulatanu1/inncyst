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

interface Iotpset {
  email: string;
  phone: string;
  registrationId: string | number;
}
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
  regId: string = '';
  isPhoneVerify: boolean = false;
  isEmailVerify: boolean = false;
  userEmails: string | null;
  userMobileNumber: string | null;
  role: string = '';
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
    this.userEmails = ls.get('user-email');
    this.userMobileNumber = ls.get('user-phone');

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
        const response = resp as unknown as regResponse;
        this.regId = response.data._id;
        console.log();
        this.isPhoneVerify = response.data.phoneVerified;
        this.isEmailVerify = response.data.emailVerified;
        this.userEmails = response.data.email;
        this.userMobileNumber = response.data.phone;
        this.role = response.data.role;
        console.log(
          this.isEmailVerify,
          'vvv',
          this.userEmails,
          this.userMobileNumber
        );
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
    this.ngOtpInput1.otpForm.disable();
    this.ngOtpInput2.otpForm.disable();
    console.log(this.verifyRegistration.value);
    if (this.verifyRegistration.valid) {
      const otpData = this.verifyRegistration.value;
      otpData.registrationId = this.regId;
      console.log(otpData);
      let otpset: Iotpset = {
        email: otpData.emailOtp,
        phone: otpData.phoneOtp,
        registrationId: this.regId,
      };
      this.otpVerifivation.otpSubmit(otpset).subscribe({
        next: (res) => {
          debugger;
          ls.set('token', res.token);
          ls.set('user-verified', res.data.verified);
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.message,
          });
          this.ngOtpInput1.setValue(null);
          this.ngOtpInput2.setValue(null);
          console.log(this.role);
          switch (this.role) {
            case 'college':
              this._toast.showToaster.next({
                severity: 'warning',
                summary: 'Working on it',
                detail: 'Please try again!',
              });
              break;
            case 'student':
              this.router.navigateByUrl('/jobs-internships');
              break;
            case 'company':
              this.router.navigateByUrl('/industry');
              break;
            case 'mentor':
              this._toast.showToaster.next({
                severity: 'warning',
                summary: 'Working on it',
                detail: 'Please try again!',
              });
              // this.router.navigateByUrl('/mentor');
              break;
          }
        },
        error: (err) => {
          this.ngOtpInput1.otpForm.enable();
          this.ngOtpInput2.otpForm.enable();
        },
      });
    }
  }

  logout() {
    this.auth.logout();
  }
}
