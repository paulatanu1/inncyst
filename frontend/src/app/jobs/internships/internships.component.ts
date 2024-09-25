import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { throwIfEmpty } from 'rxjs';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginDetailsService } from 'src/app/common-service/login-details.service';
import { InternshipProfileService } from 'src/app/share/service/internship-profile.service';

// import { OtpVerificationService } from 'src/app/share/registration-otp/otp-verification.service';
import { OtpVerificationService } from 'src/app/share/registration-otp/otp-verification.service';
import ls from 'localstorage-slim';
@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss'],
  providers: [MessageService],
})
export class InternshipsComponent implements OnInit {
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
  leftSideListLoadding = false;
  rightSideLoadding = false;
  public daysAgo!: number;
  profileDetails: any;
  constructor(
    private loginDetails: LoginDetailsService,
    private router: Router,
    private messageService: MessageService,
    private jobService: JobsService,
    private internshipService: InternshipProfileService,
    private otpService: OtpVerificationService
  ) {}

  ngOnInit(): void {
    //profile api call
    this.internshipService.sendInternshipProfileRequest().subscribe({
      next: (res) => {
        this.profileDetails = res;
        ls.set('profileImage', res.data.image);
      },
    });
    this.jobService.afterSuccessApplyJobCloseModal.subscribe({
      next: (res) => {
        setTimeout(() => {
          this.closeProfileUpdateForm();
        }, 1500);
      },
    });
    this.internshipService.customHeader.next(false);
    this.items = [
      {
        label: 'Skill',
        routerLink: 'skills',
        command: (event: any) => {
          this.activeIndex = 0;
          // this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
        },
      },
      {
        label: 'Info',
        routerLink: 'uploadresume',
        command: (event: any) => {
          this.activeIndex = 1;
          // this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
        },
      },
    ];
    this.AllJbDetaails();

    //sorting filter start here
    this.Sort = [
      {
        name: 'Sort by',
        disabled: true,
      },
      { name: 'Ascending', value: 'asc' },
      { name: 'Descending', value: 'dsc' },
    ];

    this.jobTypeSort = [
      {
        name: 'Job Type',
        disabled: true,
      },
      {
        name: 'Office',
      },
      {
        name: 'Remote',
      },
      {
        name: 'Hybrid',
      },
    ];
    this.typeSort = [
      {
        name: 'Type',
        disabled: true,
      },
      {
        name: 'Internship',
      },
      {
        name: 'Job',
      },
    ];
  }
  onRangeChange(e: any) {
    this.salaryFrom = e.values[0].toString();
    this.salaryTo = e.values[1].toString();
    this.page = 0;
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }

  selectedJobTypeDropdown(event: any) {
    this.jobType = event.value.name;
    this.page = 0;
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }
  sortDropdown(e: any) {
    this.sort = e.value.value;
    this.page = 0;
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }
  selectedTypeDropdown(e: any) {
    this.type = e.value.name;
    this.page = 0;
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }
  sortLocation() {
    this.AllJobDetails = [];
    this.location =
      this.location.charAt(0).toUpperCase() + this.location.slice(1);
    this.page = 0;
    this.AllJbDetaails();
  }
  clearSearchList() {
    if (this.location == '') {
      this.AllJobDetails = [];
      this.page = 0;
      this.AllJbDetaails();
    }
  }
  resetUrl() {
    this.type = '';
    this.jobType = '';
    this.location = '';
    this.salaryFrom = '';
    this.salaryTo = '';
    this.sort = '';
    this.limit = 10;
    this.page = 0;
    this.selectedRange = [5000, 30000];
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }
  AllJbDetaails() {
    this.leftSideListLoadding = true;
    this.rightSideLoadding = true;
    // const url = `/job/jobs?type=${this.type}&jobType=${this.jobType}&location=${this.location}&salaryFrom=${this.salaryFrom}&salaryTo=${this.salaryTo}&sort=${this.sort}&limit=${this.limit}&page=${this.page}`;
    const url = `/industry/industry-posts?type=${this.type}&jobType=${this.jobType}&location=${this.location}&salaryFrom=${this.salaryFrom}&salaryTo=${this.salaryTo}&sort=${this.sort}&limit=${this.limit}&page=${this.page}`;

    this.jobService.getAllJobDetails('', url).subscribe({
      next: (res) => {
        this.AllJobDetails = [...this.AllJobDetails, ...res.data.items];
        this.totalJob = res.data.total;
        this.leftSideListLoadding = false;
        // this.rightSideLoadding=false;
        this.AllJobDetails.forEach((element: any) => {
          element.companyName = element?.companyName?.toUpperCase();
          element.intranshipName = element?.intranshipName?.toUpperCase();
          // element.salary = (element.salary * 12) / 100000;
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
        this.jobId = this.AllJobDetails[0]?._id;
        // single job details1st for 1st job and1st time
        if (this.jobId) {
          this.jobService.getJobDetails(this.AllJobDetails[0]?._id).subscribe({
            next: (res) => {
              this.rightSideLoadding = false;
              this.singleJobDetails = [];
              this.singleJobDetails.push(res.data);
              this.singleJobDetails.forEach((element: any) => {
                element.companyName = element?.companyName?.toUpperCase();
                element.type = element?.type?.toUpperCase();
                // element.salary = (element.salary * 12) / 100000;
              });
            },
            error: (err) => {
              this.rightSideLoadding = false;
            },
          });
        }
      },
      error: (err) => {
        this.leftSideListLoadding = false;
        if (err.error.message == 'jwt expired') {
          ls.clear();
          ls.remove('logoutSuccess');
          this.otpService.logoutSuccess.next(false);
          this.router.navigate(['/login']);
        }
      },
    });
  }
  applyJob() {
    this.profileUpdate = true;
    this.router.navigate(['jobs/posts/skills']);
  }

  closeProfileUpdateForm() {
    this.profileUpdate = false;
    // this.router.navigate(['jobs/internships/skills']);
  }

  jobDetails(id: string, i: number) {
    this.rightSideLoadding = true;
    this.selectedJob = i;
    this.jobService.getJobDetails(id).subscribe({
      next: (res) => {
        this.rightSideLoadding = false;
        let id = res.data._id;
        this.jobService.getSelectedJobId(res.data._id);
        this.singleJobDetails = [];
        this.singleJobDetails.push(res.data);
        this.singleJobDetails.forEach((element: any) => {
          element.companyName = element?.companyName?.toUpperCase();
          element.intranshipName = element?.intranshipName?.toUpperCase();
          element.salary = (element.salary * 12) / 100000;
        });
      },
      error: (err) => {
        this.rightSideLoadding = false;
      },
    });
  }
  ngOnDestroy(): void {
    this.internshipService.customHeader.next(true);
  }
  onScroll() {
    if (this.totalJob > this.AllJobDetails.length) {
      this.page++;
      this.AllJbDetaails();
    }
  }
  detailsPage(id: any) {
    this.router.navigate(['/jobs/details/' + id]);
  }
}
