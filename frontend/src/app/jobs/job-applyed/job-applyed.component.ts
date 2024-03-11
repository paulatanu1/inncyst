import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { InternshipProfileService } from 'src/app/share/service/internship-profile.service';

@Component({
  selector: 'app-job-applyed',
  templateUrl: './job-applyed.component.html',
  styleUrls: ['./job-applyed.component.scss'],
})
export class JobApplyedComponent implements OnInit {
  AppliedJobDetails: any = [];
  loadding = false;
  constructor(
    private internshipService: InternshipProfileService,
    private jobService: JobsService,
    private _toast: ToastServiceService,
    private router: Router
  ) {}

  //FUNCTION TO CAPITALIZED OF 1ST CHARECRTER OF EACH WORD
  capitalizeWords(str: any) {
    // Split the input string into words
    const words = str?.split(' ');

    // Capitalize the first character of each word
    const capitalizedWords = words?.map((word: any) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the capitalized words back into a single string
    const result = capitalizedWords?.join(' ');

    return result;
  }

  ngOnInit(): void {
    this.loadding = true;
    this.internshipService.customHeader.next(false);
    this.jobService.applyedJobDetails().subscribe({
      next: (res) => {
        this.AppliedJobDetails = [];
        this.AppliedJobDetails = res.data;
        this.loadding = false;
        if (this.AppliedJobDetails.length) {
          // console.log(this.AppliedJobDetails, 'applyedJobDetails');
          this.AppliedJobDetails?.forEach((element: any) => {
            // if(element.jobDetails.intranshipName){
            // element.intranshipDetails.intranshipName = this.capitalizeWords(
            //   element.intranshipDetails?.intranshipName
            // );}
            element.jobDetails.company.companyName = this.capitalizeWords(
              element.jobDetails.company.companyName
            );
          });
        }
        // this._toast.showToaster.next({
        //   severity: 'success',
        //   summary: 'success',
        //   detail: res.success,
        // });
      },
      error: (err) => {
        this.loadding = false;
        this._toast.showToaster.next({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
      },
    });
  }
  jobOption() {}
  ngOnDestroy() {
    this.internshipService.customHeader.next(true);
  }
  details(a: any) {
    // this.jobService.sendMyJobDetails.next(a)
    this.jobService.sendAppliedJobId(a);
    this.router.navigate(['/jobs/my-jobs/AppliedJobDetailsComponent', a]);
  }
  applicationStatus() {}
}
