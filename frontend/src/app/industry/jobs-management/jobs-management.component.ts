import { Component, OnInit } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/common-service/api.service';
import { JobPostListService } from './jobs-management-service/job-post-list.service';

@Component({
  selector: 'app-jobs-management',
  templateUrl: './jobs-management.component.html',
  styleUrls: ['./jobs-management.component.scss'],
})
export class JobsManagementComponent implements OnInit {
  postList: any = [];
  constructor(
    private _menuHandel: LeftMenuHandelService,
    private router: Router,
    private post: JobPostListService
  ) {}

  ngOnInit(): void {
    this._menuHandel.leftMenuActive.next(1);
    this.getJobList();
  }

  getJobList() {
    this.post.getPostList().subscribe({
      next: (res) => {
        this.postList = res.data.items;
        console.log(this.postList, this.postList.length);
      },
    });
  }

  addJobs() {
    this.router.navigate(['/industry/jobs/add-job']);
  }
}
