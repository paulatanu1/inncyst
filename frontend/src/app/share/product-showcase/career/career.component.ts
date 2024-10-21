import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';
import { LoginEnablerService } from 'src/app/service/login-enabler.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
})
export class CareerComponent implements OnInit {
  profileUpdate: boolean = false;
  activeIndex: number = 0;

  AllJobDetails: any = [];
  singleJobDetails: any = [];
  jobId = '';
  selectedJob: number = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  page = 0;
  limit = 10;
  sort = 'dsc';
  salaryFrom: any = '';
  salaryTo: any = '';
  location: string = '';
  jobType: string = '';
  type: string = '';
  totalJob!: number;
  Sort: any;
  sorting!: string;
  jobTypeSort: any = [];
  selectedJobType!: string;
  selectedType!: string;
  typeSort: any = [];
  selectedRange: [number, number] = [5000, 30000];
  daysAgo!: number;
  CurrentUrl: string = '';
  constructor(
    private jobService: JobsService,
    private _LoginEnablerService: LoginEnablerService,
    private _toast: ToastServiceService,
    private router: Router
  ) {
    this.CurrentUrl = this.router.url;
    console.log(this.router.url);
  }

  ngOnInit(): void {
    if (this.CurrentUrl === '/jobs') {
      this.type = 'job';
    } else {
      this.type = 'internship';
    }
    this.allJobDetails();
  }

  allJobDetails() {
    const url = `/industry/industry-posts?type=${this.type}&jobType=${this.jobType}&location=${this.location}&salaryFrom=${this.salaryFrom}&salaryTo=${this.salaryTo}&sort=${this.sort}&limit=${this.limit}&page=${this.page}`;

    this.jobService.basicIntershipList(url).subscribe({
      next: (res) => {
        this.AllJobDetails = [...this.AllJobDetails, ...res.data.items];
        this.totalJob = res.data.total;
        this.AllJobDetails.forEach((element: any) => {
          element.companyName = element.companyName?.toUpperCase();
          element.intranshipName = element.intranshipName?.toUpperCase();
          element.salary = (element.salary * 12) / 100000;
          let fullDate: Date = new Date(element.createdAt);
          // Get the current date
          const currentDate: Date = new Date();

          // Calculate the difference in milliseconds
          const timeDifference: number =
            currentDate.getTime() - fullDate.getTime();
          // Convert the difference to days
          this.daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
          element.createdAt = this.daysAgo;
        });
        this.jobId = this.AllJobDetails[0]._id;
        // single job details1st for 1st job and1st time
        this.jobService.getJobDetails(this.AllJobDetails[0]?._id).subscribe({
          next: (res) => {
            this.singleJobDetails = [];
            this.singleJobDetails.push(res.data);
            this.singleJobDetails.forEach((element: any) => {
              element.companyName = element.companyName?.toUpperCase();
              element.intranshipName = element.intranshipName?.toUpperCase();
              element.salary = (element.salary * 12) / 100000;
            });
          },
          error: (err) => {},
        });
      },
      error: (err) => {},
    });
  }

  onScroll() {
    if (this.totalJob > this.AllJobDetails.length) {
      this.page++;
      this.allJobDetails();
    }
  }

  gotoLogin() {
    // this._LoginEnablerService.loginFlow.next(true)
    this._toast.showToaster.next({
      severity: 'success',
      summary: 'success',
      detail: 'please login to view the page',
    });
  }
}
