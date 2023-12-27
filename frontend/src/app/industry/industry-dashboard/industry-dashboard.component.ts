import { Component, OnInit, Renderer2 } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';

@Component({
  selector: 'app-industry-dashboard',
  templateUrl: './industry-dashboard.component.html',
  styleUrls: ['./industry-dashboard.component.scss']
})
export class IndustryDashboardComponent implements OnInit {
  // toggleSwitch: any;
 
  // mainHeader: any;
  constructor(private _menuHandel:LeftMenuHandelService) { }

  ngOnInit() {
    this._menuHandel.leftMenuActive.next(0)
    
  }

  


}
