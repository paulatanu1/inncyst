import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { throwIfEmpty } from 'rxjs';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginDetailsService } from 'src/app/common-service/login-details.service';
import { InternshipProfileService } from 'src/app/share/service/internship-profile.service';
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
 
  constructor(
    private loginDetails: LoginDetailsService,
    private router: Router,
    private messageService: MessageService,
    private jobService: JobsService,
    private internshipService: InternshipProfileService
  ) {}

  ngOnInit(): void {
    this.jobService.afterSuccessApplyJobCloseModal.subscribe({
      
      next:(res)=>{
        setTimeout(()=>{
          this.closeProfileUpdateForm();
        },1500)
      
      }
    })
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
      { name: 'ace' },
      { name: 'dec' },
    ];

    this.jobTypeSort = [
      {
        name: 'Job Type',
        disabled: true,
      },
      {
        name: 'part-time',
      },
      {
        name: 'full-time',
      },
      {
        name: 'work-from-home',
      },
    ];
    this.typeSort = [
      {
        name: 'Type',
        disabled: true,
      },
      {
        name: 'designer',
      },
      {
        name: 'developer',
      },
      {
        name: 'marketing',
      },
    ];
  }
  onRangeChange(e: any) {
    this.salaryFrom = (e.values[0]).toString();
    this.salaryTo = (e.values[1]).toString();
    console.log(this.salaryFrom, this.salaryTo);
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
  selectedTypeDropdown(e: any) {
    this.type = e.value.name;
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }
  sortLocation() {
    this.AllJobDetails = [];
    this.location=this.location.charAt(0).toUpperCase() + this.location.slice(1);

    this.AllJbDetaails();
  }
  resetUrl() {
    this.type = '';
    this.jobType = '';
    this.location = '';
    this.salaryFrom = '';
    this.salaryTo = '';
    this.sort = 'dce';
    this.limit = 5;
    this.page = 0;
    this. selectedRange=[5000,30000]
    this.AllJobDetails = [];
    this.AllJbDetaails();
  }
  AllJbDetaails() {
    const url = `/job/jobs?type=${this.type}&jobType=${this.jobType}&location=${this.location}&salaryFrom=${this.salaryFrom}&salaryTo=${this.salaryTo}&sort=${this.sort}&limit=${this.limit}&page=${this.page}`;
    this.jobService.getAllJobDetails('', url).subscribe({
      next: (res) => {
        this.AllJobDetails = [...this.AllJobDetails, ...res.data.items];
        this.totalJob = res.data.total;
        this.AllJobDetails.forEach((element: any) => {
          element.companyName = element.companyName.toUpperCase();
          element.intranshipName = element.intranshipName.toUpperCase();
          element.salary = (element.salary * 12) / 100000;
        });
        this.jobId = this.AllJobDetails[0]._id;
        // single job details1st for 1st job and1st time
        this.jobService.getJobDetails(this.AllJobDetails[0]?._id).subscribe({
          next: (res) => {
            this.singleJobDetails = [];
            this.singleJobDetails.push(res.data);
            this.singleJobDetails.forEach((element: any) => {
              element.companyName = element.companyName.toUpperCase();
              element.intranshipName = element.intranshipName.toUpperCase();
              element.salary = (element.salary * 12) / 100000;
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }
  applyJob() {
    this.profileUpdate = true;
    this.router.navigate(['jobs/internships/skills']);
  }

  closeProfileUpdateForm() {
    this.profileUpdate = false;
    // this.router.navigate(['jobs/internships/skills']);
  }

  jobDetails(id: string, i: number) {
    this.selectedJob = i;
    this.jobService.getJobDetails(id).subscribe({
      next: (res) => {
        this.singleJobDetails = [];
        this.singleJobDetails.push(res.data);
        this.singleJobDetails.forEach((element: any) => {
          element.companyName = element.companyName.toUpperCase();
          element.intranshipName = element.intranshipName.toUpperCase();
          element.salary = (element.salary * 12) / 100000;
        });
        console.log(this.singleJobDetails, 'res');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.internshipService.customHeader.next(true);
  }
  onScroll() {
    console.log(this.sort, 'sort');
    console.log(this.sorting);

    if (this.totalJob > this.AllJobDetails.length) {
      this.page++;
      console.log(this.page);
      this.AllJbDetaails();
    }
  }
}
