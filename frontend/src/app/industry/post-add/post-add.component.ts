import { Component, OnInit } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobPostApiService } from '../jobs-management/jobs-management-service/job-post-api.service';
interface cities {
  optionName: string;
  code: string;
}
interface Payload {
  opportunityTypes: string;
  details: string;
  skills: string[];
  intranshipType: string;
  startDate: string;
  duration: string;
  jobOpening: number;
  responsibilities: string[];
  stipend: string;
  salary: string;
  salaryType: string;
  perks: string;
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
    private jobPost: JobPostApiService
  ) {
    this.cities = [
      { optionName: 'Months', code: 'M' },
      { optionName: 'Year', code: 'Y' },
    ];

    this.postJob = this.fb.group({
      opportunityTypes: ['', Validators.required],
      details: ['', Validators.required],
      skills: [[]],
      intranshipType: [''],
      startDate: [''],
      duration: [''],
      durationIn: [this.cities[0].optionName],
      jobOpening: [0],
      responsibilities: [[]],
      stipend: [''],
      salary: [''],
      salaryType: [this.cities[0].optionName],
      perks: [[]],
    });
  }

  ngOnInit(): void {
    this._menuHandel.leftMenuActive.next(1);
  }

  submitForm() {
    console.log(this.postJob.valid);
    if (this.postJob.valid) {
      const formData: Payload = this.postJob.value;

      this.jobPost.submitJob(formData).subscribe({
        next: (resp) => {
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
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
