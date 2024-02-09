import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit {
  AllJobDetails: any = [];
  singleJobDetails: any = [];
  profileUpdate = false;
  applied = false;
  loading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private jobService: JobsService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe({
      next: (res) => {
        this.jobService.getJobDetails(res['id']).subscribe({
          next: (res) => {
            this.applied = res.data.applied;
            // this.rightSideLoadding = false;
            this.singleJobDetails = [];
            this.singleJobDetails.push(res.data);
            this.singleJobDetails.forEach((element: any) => {
              element.companyName = element?.companyName?.toUpperCase();
              element.type = element?.type?.toUpperCase();
              // element.salary = (element.salary * 12) / 100000;
            });
            this.loading = false;
          },
          error: (err) => {
            // this.rightSideLoadding = false;
            this.loading = false;
          },
        });
      },
    });
  }

  // calculateDaysAgo(date: Date): number {
  //   const currentDate = new Date();
  //   const timeDifference = currentDate.getTime() - date.getTime();
  //   const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
  //   return daysAgo;
  // }

  calculateDaysAgo(date: Date): number {
    let originalDate: Date = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - originalDate.getTime();
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysAgo;
  }

  applyJob() {
    this.profileUpdate = true;
    // this.router.navigate(['jobs/posts/skills']);
  }
  closeProfileUpdateForm() {
    this.profileUpdate = false;
    // this.router.navigate(['jobs/internships/skills']);
  }
}
