import { Component, OnInit } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobPostApiService } from '../jobs-management/jobs-management-service/job-post-api.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
interface cities {
  optionName: string;
  code: string;
}
interface Payload {
  type: string;
  details: string;
  skills: string[];
  intranshipType: string;
  startDate: string;
  duration: string;
  jobOpening: number;
  responsibilities: string[];
  stipend: string;
  salary: number;
  salaryType: string;
  perks: string;
  id?:string
}
interface SavePayload {
  type?: string;
  details?: string;
  skills?: string[];
  intranshipType?: string;
  startDate?: string;
  duration?: string;
  jobOpening?: number;
  responsibilities?: string[];
  stipend?: string;
  salary?: string;
  salaryType?: string;
  perks?: string;
  id?:string
}
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent implements OnInit {
  cities: cities[];
  city!: string;
  postJob: FormGroup;
  saveDraftId!:string;
  opportunityOptions = [
    {
      name: 'opportunity',
      value: 'Internship',
      inputId: 'internship',
      formControlName: 'type',
      label: 'Internship',
    },
    {
      name: 'opportunity',
      value: 'Job',
      inputId: 'job',
      formControlName: 'type',
      label: 'Job',
    },
  ];

  internshipTypes = [
    { value: 'In-office', label: 'In-office', inputId: 'in-office' },
    { value: 'Hybrid', label: 'Hybrid', inputId: 'hybrid' },
    { value: 'Remote', label: 'Remote', inputId: 'remote' },
  ];

  constructor(
    private _menuHandel: LeftMenuHandelService,
    private fb: FormBuilder,
    private jobPost: JobPostApiService,
    private _toast:ToastServiceService
  ) {
    this.cities = [
      { optionName: 'monthly', code: 'M' },
      { optionName: 'yearly', code: 'Y' },
    ];

    this.postJob = this.fb.group({
      type: [''],
      details: [''],
      skills: [[]],
      intranshipType: [''],
      startDate: [''],
      duration: [''],
      durationIn: [this.cities[0].optionName],
      jobOpening: [0],
      responsibilities: [[]],
      stipend: [''],
      salary: [],
      salaryType: [this.cities[0].optionName],
      perks: [[]],
      
    });
  }

  ngOnInit(): void {
    this._menuHandel.leftMenuActive.next(1);
  }
  saveForm() {
    console.log(this.postJob.value, 'formValue');
    const form_Data: any = new Object();
    if (this.postJob.value.type) {
      form_Data.type = this.postJob.value.type;
      console.log(form_Data,'formValue2')
    }
    if (this.postJob.value.details) {
      form_Data.details = this.postJob.value.details;
      console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.skills.length > 0) {
      
      form_Data.skills = this.postJob.value.skills;
        console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.intranshipType) {
      form_Data.intranshipType = this.postJob.value.intranshipType;
        console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.startDate.length > 0) {
      form_Data.startDate = this.postJob.value.startDate;
        console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.duration.length > 0) {
      form_Data.duration = this.postJob.value.duration;
        console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.durationIn.length > 0) {
      form_Data.durationIn = this.postJob.value.durationIn;
        console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.jobOpening > 0) {
      form_Data.jobOpening = this.postJob.value.jobOpening;
        console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.responsibilities.length > 0) {
      form_Data.responsibilities = this.postJob.value.responsibilities;
        console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.stipend.length > 0) {
      form_Data.stipend = this.postJob.value.stipend;
        console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.salary > 0) {
      form_Data.salary = this.postJob.value.salary;
        console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.salaryType.length > 0) {
      form_Data.salaryType = this.postJob.value.salaryType;
        console.log(form_Data,'formValue3')
    }
    if (this.postJob.value.perks.length > 0) {
      form_Data.perks = this.postJob.value.perks;
        console.log(form_Data,'formValue3')
    }
    // console.log(form_Data, 'form_Data');
    // const formData:SavePayload=this.postJob.value
    this.jobPost.saveJob(form_Data).subscribe({
      next:(res)=>{
        this.saveDraftId=res.data._id;
        console.log(this.saveDraftId,'savejob')
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
      },
      error:(err)=>{
        this._toast.showToaster.next({
          severity: 'Error',
          summary: 'Error',
          detail: err.error.message,
        });
      }
    })
  }
  submitForm() {
    console.log(this.postJob.valid);
    if (this.postJob.valid) {
      const formData: Payload = this.postJob.value;
      if(this.saveDraftId){
        alert('dd')
        formData.id=this.saveDraftId;
      }

      this.jobPost.submitJob(formData).subscribe({
        next: (resp) => {
          console.log(resp);
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: resp.message,
          });
        },
        error: (err) => {
          this._toast.showToaster.next({
            severity: 'Error',
            summary: 'Error',
            detail: err.error.message,
          });
        },
      });

      // Now you can use formData to send the data to your API
      console.log(formData);

      // Clear the form or perform any necessary actions
      // this.postJob.reset();
    }
  }

  handleInternshipRadioButtonChange(event: Event) {
    console.log(event);
  }

  // handleJobRadioButtonChange(event: Event) {
  //   console.log(event);
  // }
}
