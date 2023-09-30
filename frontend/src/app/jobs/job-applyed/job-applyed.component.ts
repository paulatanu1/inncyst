import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/service/jobs.service';
import { InternshipProfileService } from 'src/app/share/service/internship-profile.service';

@Component({
  selector: 'app-job-applyed',
  templateUrl: './job-applyed.component.html',
  styleUrls: ['./job-applyed.component.scss']
})
export class JobApplyedComponent implements OnInit {

  constructor(private internshipService:InternshipProfileService,private jobService:JobsService) { }

  ngOnInit(): void {
    this.internshipService.customHeader.next(false);
this.jobService.applyedJobDetails().subscribe({
  next:(res)=>{
console.log(res,'applyedJobDetails')
  }
})
  }
ngOnDestroy(){
  this.internshipService.customHeader.next(true);

}
}
