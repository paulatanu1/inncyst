import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { LoginApiService } from './login-api.service';
import { OtpVerificationService } from '../registration-otp/otp-verification.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import ls from 'localstorage-slim';
import { LoginDetailsService } from 'src/app/common-service/login-details.service';
import { LoginEnablerService } from 'src/app/service/login-enabler.service';
interface options {
  name: string;
  code: string;
}

interface IloginOptionType {
  title: string;
  code: number;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  options: options[];
  loginForm!: FormGroup;
  loginOptionType: IloginOptionType[];
  // login: boolean = true;
  forgotPassword: boolean = false;
  forgotPasswordOtp: boolean = false;
  resetPassword: boolean = false;
  loginModal: boolean = true;
  emailOtp: any;
  otpPage: boolean = false;
  email!: string;
  newPassword: any;
  confirmPassword: any;
  closePopup: boolean = false;
  //Output
  @Output() openRegisterFlow = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginApiService,
    private otpVerifivation: OtpVerificationService,
    private router: Router,
    private _toast: ToastServiceService,
    private loginDetails: LoginDetailsService,
    private _LoginEnablerService:LoginEnablerService
  ) {
    this.options = [{ name: 'Select the option', code: '0' }];

    this.loginOptionType = [
      { title: 'Student', code: 0 },
      { title: 'Industry', code: 1 },
    ];
  }
  dropDown(e: any) {
    this.loginForm.patchValue({
      options: e.value,
    });
  }

  ngOnInit(): void {


    this.loginService.loginModal.subscribe((val) => {
      this.loginModal = <boolean>val;
    });
    this.loginService.forgotPassword.subscribe((val) => {
      this.forgotPassword = <boolean>val;
    });
    this.loginService.forgotPasswordOtp.subscribe((val) => {
      this.forgotPasswordOtp = <boolean>val;
    });
    this.loginService.resetPassword.subscribe((val) => {
      this.resetPassword = <boolean>val;
    });

    this.loginService.closePopup.subscribe((val: any) => {
      this.closePopup = <boolean>val;
      if (this.closePopup == true) {
        this.loginForm.reset();
      }
    });

    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        options: [
          'Student',
          [Validators.required],
          this.validPassword.bind(this),
        ],
      },
      {
        // validators: MustMatch('password', 'confirmPassword')
      }
    );
    //for scroll issue
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }
  validPassword(control: AbstractControl) {
    return of('' === control.value).pipe(
      map((result) => (result ? { invalid: true } : null))
    );
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      let userEmail = this.loginForm.get('email')?.value;
      let password = this.loginForm.get('password')?.value;
      let userRole = this.loginForm.get('options')?.value;
      this.loginService.login(userEmail, password, userRole).subscribe({
        next: (res) => {
          console.log(res)
          this.otpVerifivation.loginflow.next(false);
          this.otpVerifivation.logoutSuccess.next(true);
          ls.set('questionStep',res.data.question_step)
          ls.set('id',res.data._id)
          // ls.set('logoutSuccess',true)
          // ls.set('loginDetails',{
          //   name:res.data.name,
          //   email:res.data.email,
          //   phone:res.data.phone,
          //   image:res.data.image
          // })

          if (res.LOGIN_TYPE == 'student') {
            alert('student')
            this.router.navigateByUrl('jobs/posts');
            ls.set('role', 'student');

            // this.router.navigate(['/jobs/internship']);
          } else if (res.LOGIN_TYPE == 'industry') {
            alert('studentuuuuuuuu')

            ls.set('role', 'industry');
            this.router.navigate(['industry']);
            if (
              res.LOGIN_TYPE === 'industry' &&
              res.data.question_step == false
            ) {
              this.router.navigateByUrl('/industry/profile');
            }
          }
        },
        error: (err) => {

          console.log(err.error.message);
          if(err.error.message == 'Please varify your email and phone'){
            this._LoginEnablerService.otpPage.next(true)
            this._LoginEnablerService.loginFlow.next(false)
            this.loginModal=false
            this.router.navigateByUrl('/registeration')
            this._toast.showToaster.next({
              severity: 'error',
              summary: 'error',
              detail: err.error.message,
            });
          }
         else{

           this._toast.showToaster.next({
             severity: 'error',
             summary: 'error',
             detail: err.error.message,
           });          this.otpVerifivation.loginflow.next(false);
           this.router.navigateByUrl('/home');
         }
        },
      });
    }
  }

  loginPanelOpen() {
    this.openRegisterFlow.emit(true);
  }

  // forgot password
  fogotPassword() {
    this.loginModal = false;
    this.forgotPassword = true;
  }
  ForgotPasswordCancel() {
    this.forgotPassword = false;
    this.loginModal = true;
  }
  forgotPasswordSubmit(email: any) {
    this.loginService.forgetpassword(email).subscribe({
      next: (res) => {
        this.otpPage = true;
        this.email = email;
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
        this.forgotPasswordOtp = true;
        this.forgotPassword = false;
      },
      error: (res) => {
        this._toast.showToaster.next({
          severity: 'error',
          summary: 'error',
          detail: res.error.message,
        });
      },
    });
  }
  forgotPasswordOtpCancel() {
    this.forgotPasswordOtp = false;
    this.forgotPassword = true;
  }
  otpVrify() {
    let otpSet = {
      email: this.email,
      otp: this.emailOtp,
    };
    this.otpVerifivation.forgotPasswordOtpSubmit(otpSet).subscribe({
      next: (res) => {
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
        this.forgotPasswordOtp = false;
        this.resetPassword = true;
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (res) => {
        this._toast.showToaster.next({
          severity: 'error',
          summary: 'error',
          detail: res.error.message,
        });
      },
    });
  }
  resetPasswordCancel() {
    this.resetPassword = false;
    this.forgotPasswordOtp = true;
  }
  passwordReset() {
    let resetPasswordSet = {
      email: this.email,
      newPassword: this.confirmPassword,
      password: this.newPassword,
    };
    this.loginService.passwordReset(resetPasswordSet).subscribe(
      (res: any) => {
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
        this.backToLogIn();
      },
      (er: any) => {
        this._toast.showToaster.next({
          severity: 'error',
          summary: 'error',
          detail: er.error.message,
        });
      }
    );
  }
  backToLogIn() {
    this.loginModal = true;
    this.forgotPassword = false;
    this.forgotPasswordOtp = false;
    this.resetPassword = false;
  }

  onEmailOtpChange(event: any) {
    if (event.length == 4) {
      this.emailOtp = event;
    }
  }
}
function observableOf(arg0: boolean) {
  throw new Error('Function not implemented.');
}
