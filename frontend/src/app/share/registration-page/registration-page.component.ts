import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationTabComponent } from '../../share/registration-tab/registration-tab.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmPasswordValidator } from 'src/app/common-service/passwordValidators';
import { RegistrationService } from 'src/app/registration-service/registration.service';
import { ProgressBarService } from 'src/app/service/progress-bar.service';
import ls from 'localstorage-slim';
import { LoginEnablerService } from 'src/app/service/login-enabler.service';
import { QuestionSetEnablerService } from 'src/app/service/question-set-enabler.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { HeaderService } from '../module-service/header.service';
import { OtpVerificationService } from '../registration-otp/otp-verification.service';
import { NgOtpInputModule } from 'ng-otp-input';
import { AuthService } from '@auth0/auth0-angular';
import { SocialAuthService } from 'src/app/service/social-auth.service';
import { catchError, filter, of, switchMap, take, tap } from 'rxjs';
import { LoginApiService } from '../login/login-api.service';
interface options {
  optionName: string;
  code: string;
}

interface IregistrationOption {
  option: string;
  id: number;
}

interface Iotpset {
  email: string;
  phone: string;
  registrationId: string | number;
}

// {
//   provide: HTTP_INTERCEPTORS,
//   useClass: AuthInterceptor,
//   multi: true,
// }
@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  providers: [MessageService, NgOtpInputModule],
})
export class RegistrationPageComponent implements OnInit {
  @ViewChild('ngOtpInput1') ngOtpInput1: any;
  @ViewChild('ngOtpInput2') ngOtpInput2: any;
  registration: boolean = false;
  isStudent: boolean = false;
  isEmployer: boolean = false;
  index: number = 0;
  value1: string = '';
  option: options[];
  isSignup: boolean = false;
  submitted: boolean = false;
  registerForm!: FormGroup;
  sidebarEnable: boolean = false;
  loginflow: boolean = false;
  isOtpPage: boolean = false;
  // registerForm:FormGroup | undefined;
  registrationOption: IregistrationOption[] = [];
  isSubmited: boolean = false;
  progressBar: boolean = false;
  registerId: string = '';
  redirectToOtp: boolean = false;
  otpPageOpen: boolean = false;
  signupPageHide: boolean = true;
  userName!: string;
  phone!: string;
  userEmail!: string;
  isphoneOtp: string = '';
  isemailOtp: string = '';
  userRole!: string;
  OtpModal!: boolean;
  userMobileNumber!: string;
  isOtp: boolean = true;
  registrationId: any;
  otpSet: Iotpset = {
    email: '',
    phone: '',
    registrationId: '',
  };
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };
  authData: any;
  userRegRole: string = '';
  ssoType: string = '';
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private reg: RegistrationService,
    private progress: ProgressBarService,
    private router: Router,
    private route: ActivatedRoute,
    private login: LoginEnablerService,
    private question: QuestionSetEnablerService,
    private _toast: ToastServiceService,
    private header: HeaderService,
    private otpVerifivation: OtpVerificationService, // private _header:HeaderService
    private auth: AuthService,
    private socialAuth: SocialAuthService,
    private loginService: LoginApiService
  ) {
    // console.log(window, 'pp');

    this.option = [
      // {name: 'Select the option', code: '0'},
      { optionName: 'Candidate', code: '01' },
      { optionName: 'Employer', code: '02' },
      { optionName: 'Mentor', code: '03' },
      { optionName: 'Laboratory', code: '04' },
      { optionName: 'Manufacturing facility', code: '05' },
    ];

    this.registrationOption = [
      {
        option: 'student',
        id: 1,
      },
      {
        option: 'intern',
        id: 1,
      },
      {
        option: 'job',
        id: 1,
      },
    ];
  }

  ngOnInit(): void {
    ls.set('questionStep', false);
    this.login.otpPage.subscribe({
      next: (res) => {
        this.otpPageOpen = <boolean>res;
        this.signupPageHide = false;
      },
    });
    window.scrollTo(0, 0);
    this.registerForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        mobile: [
          null,
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        options: ['student', [Validators.required]],
        agree: [false, [Validators.required, Validators.requiredTrue]],
      },
      {
        validators: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );

    //
    this.progress.isProgressBarShow.subscribe({
      next: (res: boolean) => {
        this.progressBar = res;
      },
    });
    //for scroll issue
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    });

    // To get user profile
    // this.socialAuth.getUserData();

    // To get ID token (JWT)
    // this.socialAuth.getIdToken();

    // To get access token
    // this.socialAuth.getAccessToken();
    // this.getSsoDetailsFromAuth();

    this.auth.user$
      .pipe(
        // Ensure the filter predicate always returns a boolean
        filter((response) => !!(response?.email_verified && response?.email)),
        tap((response) => {
          console.log(response, 'response');
        }),
        // Map the response to the payload and call the socialLogin API
        switchMap((response) => {
          const payload = {
            type: this.ssoType ? this.ssoType : ls.get('ssoType'),
            role: this.userRegRole,
            auth0Data: response,
          };
          return this.loginService.socialLogin(payload).pipe(
            tap((res) => {
              // Handle successful response
              console.log(res, 'login successful');
              ls.set('login_token', res.token);
              ls.set('role', res.LOGIN_TYPE);
              this.socialAuth.socialData.next(res);
              if (res.data.phoneVerified) {
                console.log(res.LOGIN_TYPE == 'college');
                if (res.LOGIN_TYPE == 'candidate') {
                  this.router.navigateByUrl('jobs/posts');
                } else if (res.LOGIN_TYPE == 'college') {
                  this.router.navigate(['industry']);
                  if (res.LOGIN_TYPE === 'industry') {
                    this.router.navigateByUrl('/industry/profile');
                  }
                }
              } else {
                // this.otpPageOpen = true;
                // this.signupPageHide = false;
              }
            }),
            catchError((err) => {
              // Handle errors within socialLogin
              console.error(err, 'login failed');
              return of(null); // Return a fallback value to continue the stream
            })
          );
        }),
        catchError((err) => {
          // Handle errors from user$ observable
          console.error(err.error, 'user$ error');
          return of(null); // Return a fallback value to continue the stream
        })
      )
      .subscribe();
  }

  optionClick(url: string) {
    // this.progressBar = true;
    this.progress.isProgressBarShow.next(true);
    if (url === 'jobs') {
      this.router.navigateByUrl('/jobs');
      this.progress.isProgressBarShow.next(false);
    } else if (url === 'home') {
      this.router.navigateByUrl('/home');
      this.progress.isProgressBarShow.next(false);
    } else if (url === 'about-us') {
      this.router.navigateByUrl('/about-us');
      this.progress.isProgressBarShow.next(false);
    } else if (url === 'contactus') {
      this.router.navigateByUrl('/contactus');
      this.progress.isProgressBarShow.next(false);
    }
  }

  onSubmit() {
    // console.log(this.registerForm.get('options')?.value);
    this.isSubmited = true;
    if (this.isSubmited && this.registerForm.valid) {
      this.registration = false;
      ls.set('type', 1);
      this.userName = this.registerForm.get('userName')?.value;
      this.userEmail = this.registerForm.get('email')?.value;
      this.phone = this.registerForm.get('mobile')?.value;
      let password: string = this.registerForm.get('confirmPassword')?.value;
      this.userRole = this.registerForm.get('options')?.value;
      this.userMobileNumber = this.registerForm.get('mobile')?.value;

      this.reg
        .sendRegistrationRequest(
          this.userName,
          this.userEmail,
          this.phone,
          password,
          this.userRole
        )
        .subscribe(
          (response) => {
            // this.reg.loginResponse.next(response);
            this.otpPageOpen = true;
            this.signupPageHide = false;
            this.registrationId = response.data._id;
            const { email, name, _id, phone } = response.data;
            ls.set('userEmail', email);
            ls.set('userName', name);
            ls.set('registerId', _id);
            ls.set('phone', phone);
            ls.set('role', this.userRole);
            let severity = '';
            let summary = '';
            let detail = '';
            this.router.navigate(['/otp-verification']);
            this._toast.showToaster.next({
              severity: 'success',
              summary: 'success',
              detail: response.message,
            });
            this.isSignup = true;
            this.openVerificationModal(true);
          },
          (err) => {
            if (err.error.message == 'User Already exist') {
              this.otpPageOpen = false;
              this.signupPageHide = false;
              this.login.loginFlow.next(true);
            }
            this._toast.showToaster.next({
              severity: 'error',
              summary: 'error',
              detail: err.error.message,
            });
          }
        );
    }
  }

  openVerificationModal(value: boolean) {
    this.redirectToOtp = value;
  }
  registrationLoginOption() {
    this.registration = false;
    this.loginflow = true;
  }

  redirectToLogin() {
    this.login.loginEnable.next(true);
  }

  //   this.messageService.add({
  //     key: "main",
  //     severity: "info",
  //     detail: "Ready to scan",
  //   });
  // }

  // setQueryParams(page:string){
  //   const urlTree = this.router.createUrlTree([], {
  //     queryParams: { users: page },
  //     queryParamsHandling: "merge",
  //     preserveFragment: true });
  //     this.router.navigateByUrl(urlTree);
  // }

  // resetQueryParams(){
  //   this.router.navigate([], {
  //     queryParams: {
  //       'users': null,
  //       'youCanRemoveMultiple': null,
  //     },
  //     queryParamsHandling: 'merge'
  //   })
  // }

  // register(){
  //   this.setQueryParams('register')
  //   this.registration = true;
  // }

  // quistionSubmit(event:boolean){
  //   this.isOtpPage = event;
  //   this.isSignup = false;
  // }

  // OtpModal(event: boolean) {
  //   console.log(event);
  //   // this.isOtpPage = event;
  //   this.redirectToOtp = event;
  //   this.header.userLoggedin.next(true);
  // }

  // openRegisterFlow(event:boolean){
  //   this.registration = event;
  //   this.loginflow = false;
  // }

  onEmailOtpChange(event: any) {
    //  console.log(event , 'onemailOtpChange')
    this.isemailOtp = event;
  }
  onPhoneOtpChange(event: any) {
    // console.log(event , 'onPhoneOtpChange')
    this.isphoneOtp = event;
  }
  onSubmitOtp() {
    this.otpSet = {
      email: this.isemailOtp,
      phone: this.isphoneOtp,
      registrationId: this.registrationId,
    };
    this.otpVerifivation.otpSubmit(this.otpSet).subscribe({
      next: (res) => {
        this.OtpModal = false;
        this.redirectToOtp = false;
        //  this.otpPageOpen=false
        this.otpVerifivation.logoutSuccess.next(true);
        this.header.userLoggedin.next(true);
        ls.set('questionStep', res.data.question_step);
        ls.set('logged', true);
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
        //set route logic for user
        if (this.userRole === 'student') {
          this.router.navigate(['/jobs/posts']);
        } else if (this.userRole === 'industry') {
          this.router.navigate(['industry']);
        }
      },
      error: (err) => {},
    });
  }
  onHide() {
    this.isOtp = false;
    this.OtpModal = false;
  }
  onOtpChange(event: any) {
    confirm(event);
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

  // ssoLogin(param: string) {
  //   this.auth.loginWithPopup({ connection: param });
  // }
  ssoLogin(param: string) {
    this.ssoType = param === 'google-oauth2' ? 'google' : 'linkedin';
    ls.set('ssoType', this.ssoType);
    this.auth.user$
      .pipe(
        take(1), // Get the latest user data once
        switchMap((user: any) => {
          // Check if the user is blocked
          if (user?.app_metadata?.isBlocked) {
            alert('Access denied: User is blocked.');
            alert(
              'Access denied. Your account is blocked. Please contact support.'
            );
            return of(null); // Return a null observable to prevent further processing
          } else {
            // If not blocked, proceed with the login
            return this.auth.loginWithPopup({ connection: param });
          }
        }),
        catchError((error) => {
          // console.error('Login failed:', { error });
          let errorMessage = 'Login failed. Please try again.';

          if (error?.error) {
            if (error.error === 'invalid_grant') {
              errorMessage =
                'Invalid credentials. Please check your username and password.';
            } else if (error.error === 'blocked_user') {
              errorMessage = 'Your account is blocked. Please contact support.';
            } else if (error.error === 'network_error') {
              errorMessage =
                'Network error. Please check your internet connection and try again.';
            } else {
              errorMessage = error.error_description || errorMessage;
            }
          }

          // this.auth.logout();
          // this.router.navigate();
          return of(null);
        })
      )
      .subscribe();
  }

  currentTab(event: string) {
    this.userRegRole = event;
    console.log(this.userRegRole, 'role');
    ls.set('role', this.userRegRole);
  }
  getSsoDetailsFromAuth() {
    this.auth.user$.subscribe({
      next: (res) => {
        this.authData = res;
        let loginType = res?.sub?.includes('google-oauth2')
          ? 'google'
          : 'linkedin';
        this.ssoRegistration(this.userRegRole, this.authData, loginType);
      },
      error: (err) => {},
    });
  }

  ssoRegistration(role: string, authData: {}, loginType: string) {
    this.reg.ssoProcress(role, authData, loginType).subscribe({
      next: (res) => {
        this.router.navigate(['/otp-verification']);
      },
      error: (error) => {},
    });
  }
}
