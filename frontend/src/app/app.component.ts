import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { LastUrlService } from './common-service/last-url.service';
import { ToastServiceService } from './service/toast-service.service';
import { UrlConfig, urlConfig } from './url-config';
import { LoginApiService } from './share/login/login-api.service';
import ls from 'localstorage-slim';
import { OtpVerificationService } from './share/registration-otp/otp-verification.service';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { UserLocationService } from './global-component/user-location.service';
import { environment } from 'src/environments/environment';

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
    '/registeration': { isDashboard: false, isdisable: false },
  };
  city: string = '';
  state: string = '';
  googleMapApiKey = environment.GOOGLE_MAP_KEY;
  constructor(
    private _router: Router,
    private spinner: NgxSpinnerService,
    private lastUrl: LastUrlService,
    private _toast: ToastServiceService,
    private messageService: MessageService,
    private otpVerifivation: OtpVerificationService,
    private cdk: ChangeDetectorRef,
    private locationService: UserLocationService
  ) {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
    //Header show and Hide
    this._router.events.subscribe((val) => {
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
      next: (res) => {
        const { severity, summary, detail } = res;
        this.showSuccess(severity, summary, detail);
      },
    });

    //location
    this.locationService
      .loadGoogleMapsAndGetLocation(this.googleMapApiKey)
      .then(({ lat, lng }) => {
        return this.locationService.getCityAndState(lat, lng);
      })
      .then(({ city, state, premise, subLocality, area, Dist, pinCode }) => {
        this.city = city;
        this.state = state;
        console.log(
          this.city,
          this.state,
          premise,
          subLocality,
          area,
          Dist,
          pinCode
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    //location
  }

  showSuccess(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
