import { Component, OnInit, SimpleChange } from '@angular/core';
import { JobsService } from 'src/app/service/jobs.service';

@Component({
  selector: 'app-applied-job-details',
  templateUrl: './applied-job-details.component.html',
  styleUrls: ['./applied-job-details.component.scss']
})
export class AppliedJobDetailsComponent implements OnInit {
appliedJobDetails:any;
  constructor(private jobService:JobsService) { }
ngOnChanges(changes:SimpleChange){
  console.log(changes,'changes')
  // this.jobService.sendMyJobDetails.subscribe({
  //   next:(res)=>{
  //     console.log(res,'hhhhhhhhhhhhhhhh')
  //     this.appliedJobDetails=res;
  //     console.log(this.appliedJobDetails,'get job details')
  //   }
  // })
}
  ngOnInit(): void {
    this.jobService.getAppliedJobDetails().subscribe({
      next:(res)=>{
        console.log(res,'hhhhhhhhhhhhhhhh')
        this.appliedJobDetails=res;
        console.log(this.appliedJobDetails,'get job details')
      }
    })
  }

}
