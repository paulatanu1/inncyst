import { Component, OnInit } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';

@Component({
  selector: 'app-industry-reports',
  templateUrl: './industry-reports.component.html',
  styleUrls: ['./industry-reports.component.scss']
})
export class IndustryReportsComponent implements OnInit {

  constructor(private _menuHandel:LeftMenuHandelService) { }

  ngOnInit(): void {
    this._menuHandel.leftMenuActive.next(2)
  }

}
