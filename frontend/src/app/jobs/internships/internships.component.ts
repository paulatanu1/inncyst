import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { throwIfEmpty } from 'rxjs';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';
import { HttpClient } from '@angular/common/http';
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
  url: string = '/job/jobs';
  AllJobDetails:any=[];
  singleJobDetails:any=[];
  jobId=''
  selectedJob:number=0;

  constructor(
    private loginDetails: LoginDetailsService,
    private router: Router,
    private messageService: MessageService,
    private jobService: JobsService,
    private internshipService:InternshipProfileService
  ) {}

  ngOnInit(): void {

this.internshipService.customHeader.next(false)
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

    //at the firt time load all job detailss
    this.url =
      this.url + '?type=&jobType=&location=&salary=&sort=dsc&limit=10&page=0';
    this.jobService.getAllJobDetails('', this.url).subscribe({
      next: (res) => {
        this.AllJobDetails=res.data.items;
        console.log(this.AllJobDetails);
        this.AllJobDetails.forEach((element:any) => {
          element.companyName=element.companyName.toUpperCase();
          element.intranshipName=element.intranshipName.toUpperCase();
          // element.salary=(element.salary * 12) / 100000
        });
this.jobId=this.AllJobDetails[0]._id;
console.log(this.jobId)

        // single job details1st for 1st job and1st time
        this.jobService.getJobDetails(this.AllJobDetails[0]._id).subscribe({
          next: (res) => {
            this.singleJobDetails=[];
            this.singleJobDetails.push(res.data);
            this.singleJobDetails.forEach((element:any) => {
              element.companyName=element.companyName.toUpperCase();
              element.intranshipName=element.intranshipName.toUpperCase();
              element.salary=(element.salary * 12) / 100000
            });
            console.log(this.singleJobDetails, 'res');
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

  jobDetails(id: string,i:number) {
    this.selectedJob=i
    this.jobService.getJobDetails(id).subscribe({
      next: (res) => {
        this.singleJobDetails=[];
        this.singleJobDetails.push(res.data);
        this.singleJobDetails.forEach((element:any) => {
          element.companyName=element.companyName.toUpperCase();
          element.intranshipName=element.intranshipName.toUpperCase();
          element.salary=(element.salary * 12) / 100000
        });
        console.log(this.singleJobDetails, 'res');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.internshipService.customHeader.next(true)

    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
