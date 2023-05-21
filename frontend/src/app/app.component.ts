import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  isDashboard:boolean = true;

  constructor(private _router: Router){
    //Header show and Hide
    _router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        if(val.url == '/dashboard'){
          this.isDashboard = false;
        }
      }
    })
  }
}
