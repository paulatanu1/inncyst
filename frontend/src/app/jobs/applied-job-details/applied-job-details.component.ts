import { Component, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';

@Component({
  selector: 'app-applied-job-details',
  templateUrl: './applied-job-details.component.html',
  styleUrls: ['./applied-job-details.component.scss'],
})
export class AppliedJobDetailsComponent implements OnInit {
  appliedJobDetails: any;
  appliedJobId: any;
  constructor(private jobService: JobsService, private router: Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
this.activatedRoute.params.subscribe({
  next:(res)=>{
    this.appliedJobId=res['id']
    if(this.appliedJobId){
      this.jobService.getAppliedJobDetails(this.appliedJobId).subscribe({
        next: (res) => {
          this.appliedJobDetails = res.data;
        },
      });
    }
  }
})
  }

  backToJobDetails(){
    this.router.navigateByUrl('/jobs/jobs/my-applyed-job')
  }
ngOnDestroy(): void {
  this.appliedJobId=null;
  this.appliedJobDetails=null;
  // this.
}
}
