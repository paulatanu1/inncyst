import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { LastUrlService } from './common-service/last-url.service';
import { ToastServiceService } from './service/toast-service.service';
import { UrlConfig, urlConfig } from './url-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]

})
export class AppComponent implements OnInit {
  title = 'frontend';
  isDashboard: boolean = true;
  isDisable: boolean = true;
  urlConfig = {
    '/dashboard': { isDashboard: false, isdisable: false },
    '/industry/': { isDashboard: false, isdisable: false },
    '/industry': { isDashboard: false, isdisable: false },
    '/registeration': { isDashboard: false, isdisable: false },
  };
  
  constructor(private _router: Router,private spinner: NgxSpinnerService,private lastUrl:LastUrlService,private _toast:ToastServiceService,private messageService:MessageService){
    //Header show and Hide
    this._router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        const url = val.url;
        const config: UrlConfig = urlConfig[url] || { isDashboard: true, isDisable: true };
        this.isDashboard = config.isDashboard;
        this.isDisable = config.isDisable;
      }
    })
  }

  ngOnInit(): void {
    this.spinner.show();
    console.log(this.lastUrl.getPreviousUrl())

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);

    this._toast.showToaster.subscribe({
      next:(res)=>{
        console.log(res,'res')
        const {severity,summary,detail} = res
        this.showSuccess(severity,summary,detail)
      }
    })
  }

  showSuccess(severity:string,summary:string,detail:string) {
    this.messageService.add({severity:severity, summary: summary, detail: detail});
}


}
