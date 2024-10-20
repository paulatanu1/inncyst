import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { JobsService } from 'src/app/service/jobs.service';
import { LoginEnablerService } from 'src/app/service/login-enabler.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';

@Component({
  selector: 'app-basic-internship',
  templateUrl: './basic-internship.component.html',
  styleUrls: ['./basic-internship.component.scss'],
})
export class BasicInternshipComponent implements OnInit {
  profileUpdate: boolean = false;
  items: MenuItem[] = [];
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
  constructor(
    private jobService: JobsService,
    private _LoginEnablerService: LoginEnablerService,
    private _toast: ToastServiceService
  ) {}

  ngOnInit(): void {
    // this.jobService.basicIntershipList().subscribe({
    //   next: (res) => {
    //     this.AllJobDetails = [...this.AllJobDetails, res];
    //     console.log(this.AllJobDetails, 'basicInternShip');
    //   },
    // });
    this.AllJbDetaails();
    this.items = [
      {
        label: 'Skill',
        routerLink: 'skills',
        command: (event: any) => {
          this.activeIndex = 0;
        },
      },
      {
        label: 'Info',
        routerLink: 'uploadresume',
        command: (event: any) => {
          this.activeIndex = 1;
        },
      },
    ];

    //sorting filter start here
    this.Sort = [
      {
        name: 'Sort by',
        disabled: true,
      },
      { name: 'asc' },
      { name: 'dsc' },
    ];

    this.jobTypeSort = [
      {
        name: 'Job Type',
        disabled: true,
      },
      {
        name: 'office',
      },
      {
        name: 'remote',
      },
      {
        name: 'hybrid',
      },
    ];
    this.typeSort = [
      {
        name: 'Type',
        disabled: true,
      },
      {
        name: 'intranship',
      },
      {
        name: 'job',
      },
    ];
  }
  AllJbDetaails() {
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

  //reset url
  resetUrl() {
    this.type = '';
    this.location = '';
    this.jobType = '';
    this.salaryFrom = '';
    this.salaryTo = '';
    this.sort = 'asc';
    this.limit = 10;
    this.page = 0;
    this.selectedRange = [5000, 30000];
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }

  //sort
  sortLocation() {
    this.AllJobDetails = [];
    this.location =
      this.location.charAt(0).toUpperCase() + this.location.slice(1);

    this.AllJbDetaails();
  }

  selectedTypeDropdown(e: any) {
    this.type = e.value.name;
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }
  selectedJobTypeDropdown(event: any) {
    this.jobType = event.value.name;
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }
  sortDropdown(e: any) {
    this.sort = e.value.name;
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }

  onRangeChange(e: any) {
    this.salaryFrom = e.values[0].toString();
    this.salaryTo = e.values[1].toString();
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }
  jobDetails(id: string, i: number) {
    this.selectedJob = i;
    this.jobService.getJobDetails(id).subscribe({
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
  }
  onScroll() {
    if (this.totalJob > this.AllJobDetails.length) {
      this.page++;
      this.AllJbDetaails();
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
