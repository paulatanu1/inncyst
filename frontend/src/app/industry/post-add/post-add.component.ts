import { Component, OnInit } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private fb: FormBuilder
  ) {
    this.cities = [
      { optionName: 'Months', code: 'M' },
      { optionName: 'Year', code: 'Y' },
    ];

    this.postJob = this.fb.group({
      type: ['', Validators.required],
      details: ['', Validators.required],
      skills: [[]],
      intranshipType: [''],
      startDate: [''],
      duration: [''],
      jobOpening: [0],
      responsibilities: [[]],
      stipend: [''],
      salary: [0],
      salaryType: [''],
      perks: [''],
    });
  }

  ngOnInit(): void {
    this._menuHandel.leftMenuActive.next(1);
  }

  submitForm() {
    if (this.postJob.valid) {
      const formData: Payload = this.postJob.value;

      // Now you can use formData to send the data to your API
      console.log(formData);

      // Clear the form or perform any necessary actions
      this.postJob.reset();
    }
  }

  handleInternshipRadioButtonChange(event: Event) {
    console.log(event);
  }

  // handleJobRadioButtonChange(event: Event) {
  //   console.log(event);
  // }
}
