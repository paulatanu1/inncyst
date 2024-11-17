import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ConfirmPasswordValidator } from 'src/app/common-service/passwordValidators';
import { RegistrationService } from 'src/app/registration-service/registration.service';
import { ProgressBarService } from 'src/app/service/progress-bar.service';
import ls from 'localstorage-slim';
import { LoginEnablerService } from 'src/app/service/login-enabler.service';
import { QuestionSetEnablerService } from 'src/app/service/question-set-enabler.service';
import { HeaderService } from '../module-service/header.service';
import { OtpVerificationService } from '../registration-otp/otp-verification.service';
import { LoginApiService } from '../login/login-api.service';
import { LoginDetailsService } from 'src/app/common-service/login-details.service';
import { InternshipProfileService } from '../service/internship-profile.service';
import { SlideMenu } from 'primeng/slidemenu';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { AuthService } from '@auth0/auth0-angular';
import { SocialAuthService } from 'src/app/service/social-auth.service';
import { ISocialData } from '../login/auth-model/auth.model';

interface options {
  optionName: string;
  code: string;
}

interface IregistrationOption {
  option: string;
  id: number;
}

interface IResponse<T> {
  success: boolean;
  data: T;
  message: string;
  LOGIN_TYPE: string;
  token: string;
  status: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  profileMenu: any;
  items: MenuItem[];
  dropdownitems: MenuItem[];
  registration: boolean = false;
  isStudent: boolean = false;
  isEmployer: boolean = false;
  index: number = 0;
  value1: string = '';
  options: options[];
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
  isUserLogged: boolean | null = false;
  Profileitems!: MenuItem[];
  loginModal: boolean = true;
  logoutSuccess: boolean = false;
  forgotPassword: boolean = false;
  logInToken!: any;
  userType!: any;
  customHeader: boolean = true;
  @ViewChild('slideMenu') slidemenu!: SlideMenu;
  isMenuOpen: boolean = true;
  profileImage: any;
  allData: any;
  //Outputs
  constructor(
    private otpService: OtpVerificationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private reg: RegistrationService,
    private progress: ProgressBarService,
    private router: Router,
    private route: ActivatedRoute,
    private _login: LoginEnablerService,
    private quiestion: QuestionSetEnablerService,
    private _header: HeaderService,
    private loginApiService: LoginApiService,
    private InternshipService: InternshipProfileService,
    private cdk: ChangeDetectorRef,
    private _toast: ToastServiceService,
    private auth: AuthService,
    private socialAuth: SocialAuthService
  ) {
    //check allready login user or not
    this.profileImage = ls.get('profileImage');
    // console.log(this.profileImage, 'PI');
    this.logInToken = ls.get('login_token');
    if (this.logInToken) {
      this.logoutSuccess = true;
    } else {
      this.logoutSuccess = false;
    }

    this.userType = ls.get('userType');

    this.items = [
      {
        label: 'As a Student',
        command: () => {
          this.login('student');
        },
      },
      {
        label: 'As a Employer',
        command: () => {
          this.login('employer');
        },
      },
    ];
    this.dropdownitems = [
      { label: 'Internship/Job' },
      { label: 'Industry' },
      { label: 'Project Enabler' },
    ];

    this.options = [
      // {name: 'Select the option', code: '0'},
      { optionName: 'Intern', code: '1' },
      { optionName: 'Job', code: '2' },
      { optionName: 'Student', code: '3' },
      { optionName: 'Industry', code: '3' },
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
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.cdk.detectChanges();
  }
  ngOnChanges() {
    this.userType = ls.get('userType');
  }
  ngOnInit(): void {
    this.closeMenu();
    // To get user profile
    this.socialAuth.getUserData();

    // To get ID token (JWT)
    this.socialAuth.getIdToken();

    // To get access token
    this.socialAuth.getAccessToken();
    // debugger
    // this.logoutSuccess=true;
    // this.logoutSuccess=<boolean>ls.get('logoutSuccess');
    this.InternshipService.customHeader.subscribe({
      next: (res) => {
        this.customHeader = <boolean>res;
      },
    });
    this._login.loginFlow.subscribe({
      next: (res) => {
        this.loginflow = <boolean>res;
      },
    });
    this.Profileitems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigate(['my-profile']);
        },
      },
      {
        label: 'Job Apply',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigate(['/jobs/my-jobs']);
        },
      },

      {
        label: 'Change Password',
        icon: 'pi pi-lock',
        command: () => {
          this.router.navigate(['change-password']);
        },
      },
      {
        label: 'Logout',
        icon: 'pi pi-power-off',
        command: () => {
          this.logOutUser();
        },
      },
    ];

    this.isUserLogged = ls.get('logged');
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
        confirmPassword: ['', [Validators.required]],
        options: ['Select the option', [Validators.required]],
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

    //login page enable from service
    this._login.loginEnable.subscribe({
      next: (res) => {
        this.loginflow = res;
      },
    });

    //questions enable from service
    this.quiestion.isQuestionSetEnable.subscribe({
      next: (res) => {
        this.sidebarEnable = res;
        this.isSignup = res;
      },
    });
    this._header.userLoggedin.subscribe({
      next: (response) => {
        this.isUserLogged = response;
      },
    });
    this.otpService.logoutSuccess.subscribe({
      next: (res: any) => {
        this.logoutSuccess = res;
      },
    });
    this.otpService.loginflow.subscribe({
      next: (res: unknown) => {
        this.loginflow = <boolean>res;
      },
    });

    //for scroll issue
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    });

    this.socialAuth.socialData.subscribe({
      next: (res) => {
        console.log(res, 'data---1');
        let data = (res as unknown as IResponse<ISocialData>).data;

        if (data) {
          console.log(data, 'data---');
          this.allData = data;
          this.profileImage = this.allData.image;
          console.log(this.profileImage);
        }
      },
    });
  }

  product() {
    //check allready login user or not
    this.logInToken = ls.get('login_token');
    if (this.logInToken) {
      this.logoutSuccess = true;
    } else {
      this.logoutSuccess = false;
    }

    this.dropdownitems = [
      {
        label: 'Internship/Job',
        icon: 'pi pi-refresh',
        command: () => {
          this.userType = ls.get('userType');

          if (ls.get('login_token')) {
            this.router.navigateByUrl('/jobs/posts');
          } else if (!ls.get('login_token')) {
            this.router.navigateByUrl('/registration');
          }
        },
      },
      {
        label: 'Industry',
        icon: 'pi pi-refresh',
        command: () => {
          if (this.logInToken && this.userType == 'industry') {
            this.router.navigateByUrl('jobs/industry');
          } else if (!this.logInToken && !this.userType) {
            this.router.navigateByUrl('jobs/basicInternship');
          }
        },
      },
      {
        label: 'Project Enabler',
        icon: 'pi pi-refresh',
        command: () => {
          this._toast.showToaster.next({
            severity: 'warn',
            summary: 'Warning',
            detail: 'comming soon',
          });
        },
      },
    ];
  }
  productOrServicedropdown(type: string) {
    this.logInToken = ls.get('login_token');
    if (this.logInToken) {
      this.logoutSuccess = true;
    } else {
      this.logoutSuccess = false;
    }
    if (type === 'Internship') {
      this.userType = ls.get('userType');

      if (ls.get('login_token')) {
        this.router.navigateByUrl('/jobs/posts');
      } else if (!ls.get('login_token')) {
        this.router.navigateByUrl('/registration');
      }
    }

    if (type === 'Industry') {
      if (this.logInToken && this.userType == 'industry') {
        this.router.navigateByUrl('jobs/industry');
      } else if (!this.logInToken && !this.userType) {
        this.router.navigateByUrl('/registration');
      }
    }
    if (type == '') {
      // this._toast.showToaster.next({
      //   severity: 'warn',
      //   summary: 'Important!',
      //   detail: 'Coming Soon. Stay Tuned!',
      // });
      this.router.navigateByUrl('/coming-soon');
    }
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
    } else if (url === 'Jobs') {
      this.router.navigateByUrl('/jobs/posts');
    } else if (url === 'My Jobs') {
      this.router.navigateByUrl('/jobs/my-jobs');
    }
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.isSubmited && this.registerForm.valid) {
      this.registration = false;
      let userName: string = this.registerForm.get('userName')?.value;
      let userEmail: string = this.registerForm.get('email')?.value;
      let phone: string = this.registerForm.get('mobile')?.value;
      let password: string = this.registerForm.get('confirmPassword')?.value;
      let userRole: string = this.registerForm.get('options')?.value;
      this.reg
        .sendRegistrationRequest(userName, userEmail, phone, password, userRole)
        .subscribe((response) => {
          this.registerId = response.data._id;
          ls.set('registerId', this.registerId);
          this.isSignup = true;
          this.sidebarEnable = true;
          this.registerForm.removeValidators;
        });
    }

    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: 'Ready to scan',
    });
  }

  setQueryParams(page: string) {
    const urlTree = this.router.createUrlTree([], {
      queryParams: { users: page },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
    this.router.navigateByUrl(urlTree);
  }

  resetQueryParams() {
    this.router.navigate([], {
      queryParams: {
        users: null,
        youCanRemoveMultiple: null,
      },
      queryParamsHandling: 'merge',
    });
  }
  login(type: string) {
    if (type === 'student') {
      this.registration = true;
      this.isStudent = true;
    } else {
      this.registration = true;
      this.isEmployer = true;
    }
  }

  register() {
    ls.remove('login_token');
  }

  getLoginForm() {
    this.setQueryParams('login');
    this.loginflow = true;
    this.loginApiService.loginModal.next(true);
    this.loginApiService.forgotPassword.next(false);
    this.loginApiService.forgotPasswordOtp.next(false);
    this.loginApiService.resetPassword.next(false);
    this.loginModal = true;
    this.forgotPassword = false;
  }

  quistionSubmit(event: boolean) {
    this.isOtpPage = event;
    this.isSignup = false;
  }

  OtpModal(event: boolean) {
    this.isOtpPage = event;
  }

  registrationLoginOption() {
    this.registration = false;
    this.loginflow = true;
  }

  openRegisterFlow(event: boolean) {
    this.registration = event;
    this.loginflow = false;
  }

  onClosePopup(popupname: string) {
    this.loginApiService.closePopup.next(true);
    if (popupname) {
      this.resetQueryParams();
    }
  }
  logOutUser() {
    ls.clear();
    //this.isUserLogged = true;
    this.logoutSuccess = false;
    ls.remove('logoutSuccess');
    this.socialAuth.logout();
  }
  cancel() {
    this.forgotPassword = false;
    this.loginModal = true;
  }

  closeMenu() {
    if (this.isMenuOpen) {
      // this.slidemenu.hide();
      this.isMenuOpen = false;
    }
  }

  sso() {
    this.auth.loginWithRedirect({
      connection: 'google-oauth2',
    });
  }

  ngOnDestroy(): void {
    this.isMenuOpen = false;
    // this.slidemenu.hide();
  }
}
