import { Component, OnInit } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.component.html',
  styleUrls: ['./jobs-management.component.scss']
})
export class JobsManagementComponent implements OnInit {

  constructor(private _menuHandel:LeftMenuHandelService) { }

  ngOnInit(): void {

    this._menuHandel.leftMenuActive.next(1)
  }

}
