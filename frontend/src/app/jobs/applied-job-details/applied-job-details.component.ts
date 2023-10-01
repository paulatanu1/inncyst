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
  ngOnChanges(changes: SimpleChange) {
    console.log(changes, 'changes');
    // this.jobService.sendMyJobDetails.subscribe({
    //   next:(res)=>{
    //     console.log(res,'hhhhhhhhhhhhhhhh')
    //     this.appliedJobDetails=res;
    //     console.log(this.appliedJobDetails,'get job details')
    //   }
    // })
  }
  ngOnInit(): void {
    this.appliedJobId=this .activatedRoute.snapshot.paramMap.get('id');  
// this.activatedRoute.params.subscribe({
//   next:(res)=>{
//     this.appliedJobId=res['id']
//     console.log(this.appliedJobId,'res')
  // }
// })

    this.jobService.getAppliedJobId().subscribe({
      next: (res) => {
        this.appliedJobId = res;
        this.jobService.getAppliedJobDetails(res).subscribe({
          next: (res) => {
            console.log(res, 'get job details');
            this.appliedJobDetails = res.data;
            console.log(this.appliedJobDetails, 'appliedJobDetails');
          },
        });
      },
    });
    // if (this.appliedJobId) {

    // }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //     if (performance && performance.navigation.type === 1) {
    //   // Page is being refreshed, navigate to the parent route
    //   this.router.navigate(['/jobs/jobs/my-applyed-job']);
    // }
  }
}
