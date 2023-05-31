import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isDashboard:boolean = true;

  constructor(private _router: Router,private spinner: NgxSpinnerService){
    //Header show and Hide
    _router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        if(val.url == '/dashboard'){
          this.isDashboard = false;
        }
      }
    })
  }

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }
}
