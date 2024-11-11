import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { LastUrlService } from './common-service/last-url.service';
import { ToastServiceService } from './service/toast-service.service';
import { UrlConfig, urlConfig } from './url-config';
import { LoginApiService } from './share/login/login-api.service';
// import ls from 'localstorage-slim';
import { OtpVerificationService } from './share/registration-otp/otp-verification.service';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { LocationScriptService } from './service/location-script.service';
import { environment } from 'src/environments/environment';
import { UserLocationService } from './service/user-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isDashboard: boolean = true;
  isDisable: boolean = true;
  loginToken!: any;
  urlConfig = {
    '/dashboard': { isDashboard: false, isdisable: false },
    '/industry/': { isDashboard: false, isdisable: false },
    '/industry': { isDashboard: false, isdisable: false },
    '/registration': { isDashboard: false, isdisable: false },
  };
  country: string = '';
  state: string = '';
  city: string = '';
  pinCode: string = '';
  areaLocality: string = '';
  constructor(
    private _router: Router,
    private spinner: NgxSpinnerService,
    private lastUrl: LastUrlService,
    private _toast: ToastServiceService,
    private messageService: MessageService,
    private otpVerifivation: OtpVerificationService,
    private cdk: ChangeDetectorRef,
    private userLocation: UserLocationService
  ) {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
    //Header show and Hide
    this._router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        const url = val.url;
        const config: UrlConfig = urlConfig[url] || {
          isDashboard: true,
          isDisable: true,
        };
        this.isDashboard = config.isDashboard;
        this.isDisable = config.isDisable;
      }
    });
    // this.g_script.loadGoogleMaps(environment.GOOGLE_MAP_KEY);
    this.userLocation.getLocationDetails(environment.GOOGLE_MAP_KEY).subscribe({
      next: (res) => {
        this.country = res.country;
        this.state = res.state;
        this.city = res.city;
        this.pinCode = res.pinCode;
        this.areaLocality = `${res.subLocality} ${res.area}`;
      },
    });
  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.cdk.detectChanges();
  }
  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);

    this._toast.showToaster.subscribe({
      next: (res: any) => {
        const { severity, summary, detail } = res;
        this.showSuccess(severity, summary, detail);
      },
    });
  }

  showSuccess(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
