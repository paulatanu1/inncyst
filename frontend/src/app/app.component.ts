import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LastUrlService } from './common-service/last-url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isDashboard:boolean = true;
  isdisable:boolean = true;
  constructor(private _router: Router,private spinner: NgxSpinnerService,private lastUrl:LastUrlService){
    //Header show and Hide
    this._router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        console.log(val.url , 'url')
        if(val.url == '/dashboard'){
          this.isDashboard = false;
          this.isdisable = false;
        }else if(val.url == '/registeration'){
          this.isdisable = false;
        }else{
          this.isdisable = true
        }
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
  }
}
