import { Component, OnInit } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.component.html',
  styleUrls: ['./jobs-management.component.scss'],
})
export class JobsManagementComponent implements OnInit {
  constructor(
    private _menuHandel: LeftMenuHandelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._menuHandel.leftMenuActive.next(1);
  }

  addJobs() {
    this.router.navigate(['/industry/jobs/add-job']);
  }
}
