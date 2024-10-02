import {
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
  registrationId: string = '';
  otpSet: { email: string; phone: string; registrationId: string } = {
    email: '',
    phone: '',
    registrationId: '',
  };
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private otpVerifivation: OtpVerificationService,
    private _header: HeaderService,
    private _toast: ToastServiceService,
    private reg: RegistrationService
  ) {}

  ngAfterViewInit() {
    // this.isOtp = false;
  }

  ngOnInit(): void {
    this.reg.loginResponse.subscribe({
      next: (resp) => {
        console.log(resp);
        // this.registrationId =resp?.data?._id
      },
    });
  }
  ngOnChanges() {}

  onEmailOtpChange(event: any) {
    this.isemailOtp = event;
  }
  onPhoneOtpChange(event: any) {
    this.isphoneOtp = event;
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
    this.otpSet = {
      email: this.isemailOtp,
      phone: this.isphoneOtp,
      registrationId: this.registrationId,
    };
    this.otpVerifivation.otpSubmit(this.otpSet).subscribe({
      next: (res) => {
        // this.OtpModal = false;
        // this.redirectToOtp = false;
        // //  this.otpPageOpen=false
        // this.otpVerifivation.logoutSuccess.next(true);
        // this.header.userLoggedin.next(true);
        ls.set('questionStep', res.data.question_step);
        ls.set('logged', true);
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
        //set route logic for user
        // if (this.userRole === 'student') {
        //   this.router.navigate(['/jobs/posts']);
        // } else if (this.userRole === 'industry') {
        //   this.router.navigate(['industry']);
        // }
      },
      error: (err) => {},
    });
  }
}
