import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LeftMenuHandelService } from '../left-menu-handel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobPostApiService } from '../jobs-management/jobs-management-service/job-post-api.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { JobListApiService } from '../jobs-management/posts/job-list-api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { JobPostListService } from '../jobs-management/jobs-management-service/job-post-list.service';

interface cities {
  optionName: string;
  code: string;
}
interface Ieducation {
  name: string;
  value: string;
}
interface IexperienceTime {
  name: string;
  value: string;
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
  id?: string;
  location: string;
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
  id?: string;
  location: string;
}
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent implements OnInit, AfterViewInit {
  cities: cities[];
  education: Ieducation[];
  experienceTime: IexperienceTime[];
  city!: string;
  postJob: FormGroup;
  saveDraftId!: string;
  editedJobId!: string;
  editedJobData: any;
  obj: any;
  display: boolean = false;
  savedDraftData: any = {};
  status!: boolean;
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

  title!: string;
  formvisibility: boolean = false;
  intranshipContent: boolean = false;
  jobContent: boolean = false;
  submitButtonVisibility: boolean = true;
  resetbuttonVisibility: boolean = false;
  salaryType!: string;
  constructor(
    private _menuHandel: LeftMenuHandelService,
    private fb: FormBuilder,
    private jobPost: JobPostApiService,
    private _toast: ToastServiceService,
    private _JobListApiService: JobListApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _JobPostListService: JobPostListService
  ) {
    this.cities = [
      { optionName: 'monthly', code: 'M' },
      { optionName: 'yearly', code: 'Y' },
    ];
    this.education = [
      { name: 'HS', value: 'hs' },
      { name: 'Diploma', value: 'diploma' },
      { name: 'Bachelors', value: 'bachelor' },
      { name: 'Masters', value: 'master' },
    ];

    this.experienceTime = [
      { name: 'Month', value: 'months' },
      { name: 'Years', value: 'years' },
    ];

    window.scrollTo(0, 0);
    this.postJob = this.fb.group({
      type: [''],
      details: [''],
      skills: [[]],
      intranshipType: [''],
      startDate: [''],
      duration: [''],
      durationIn: [this.cities[0].optionName],
      education: ['hs'],
      experience: [0],
      experienceTime: ['months'],
      jobOpening: [0],
      responsibilities: [[]],
      stipend: [''],
      salary: [],
      salaryType: [this.cities[0].optionName],
      perks: [[]],
      location: [''],
    });
  }
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
    this._menuHandel.leftMenuActive.next(1);
    window.scrollTo(0, 0);

    //when edit posted job or any saved job then get id
    this.activatedRoute.queryParams.subscribe({
      next: (res: any) => {
        this.editedJobId = res['id'];

        if (this.editedJobId != undefined) {
          this._JobPostListService
            .getSinglePortfolio(this.editedJobId)
            .subscribe({
              next: (res) => {
                console.log(res.data);
                this.editedJobData = res.data;
                if (res.data.type) {
                 this.typeSelect();
                }
                this.status = this.editedJobData.status;
                this.postJob.get('type')?.patchValue(this.editedJobData.type);
                this.postJob
                  .get('details')
                  ?.patchValue(this.editedJobData.details);
                this.postJob
                  .get('location')
                  ?.patchValue(this.editedJobData.location);
                this.postJob
                  .get('skills')
                  ?.patchValue(this.editedJobData.skills);
                this.postJob
                  .get('intranshipType')
                  ?.patchValue(this.editedJobData.intranshipType);
                this.postJob
                  .get('education')
                  ?.patchValue(this.editedJobData.education);
                this.postJob
                  .get('experienceTime')
                  ?.patchValue(this.editedJobData.experienceTime);
                this.postJob
                  .get('experience')
                  ?.patchValue(this.editedJobData.experience);
                this.postJob
                  .get('startDate')
                  ?.patchValue(this.editedJobData.startDate);
                this.postJob
                  .get('duration')
                  ?.patchValue(this.editedJobData.duration);
                this.postJob
                  .get('jobOpening')
                  ?.patchValue(this.editedJobData.jobOpening);
                this.postJob
                  .get('responsibilities')
                  ?.patchValue(this.editedJobData.responsibilities);
                this.postJob
                  .get('stipend')
                  ?.patchValue(this.editedJobData.stipend);
                this.postJob
                  .get('salary')
                  ?.patchValue(this.editedJobData.salary);
                this.postJob
                  .get('salaryType')
                  ?.patchValue(this.editedJobData.salaryType);
                this.postJob.get('perks')?.patchValue(this.editedJobData.perks);
              },
            });
        }
      },
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    });
  }
  saveForm() {
    console.log(this.postJob.value, 'formValue');
    const form_Data: any = new Object();
    if (this.postJob.value.type) {
      form_Data.type = this.postJob.value.type;
      console.log(form_Data, 'formValue2');
    }
    if (this.postJob.value.location) {
      form_Data.location = this.postJob.value.location;
      console.log(form_Data, 'formValue12');
    }
    if (this.postJob.value.education) {
      form_Data.education = this.postJob.value.education;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.experienceTime) {
      form_Data.experienceTime = this.postJob.value.experienceTime;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.experience) {
      form_Data.experience = this.postJob.value.experience;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.details) {
      form_Data.details = this.postJob.value.details;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.skills.length > 0) {
      form_Data.skills = this.postJob.value.skills;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.intranshipType) {
      form_Data.intranshipType = this.postJob.value.intranshipType;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.startDate?.length > 0) {
      form_Data.startDate = this.postJob.value.startDate;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.duration.length > 0) {
      form_Data.duration = this.postJob.value.duration;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.durationIn.length > 0) {
      form_Data.durationIn = this.postJob.value.durationIn;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.jobOpening > 0) {
      alert('pp');
      form_Data.jobOpening = this.postJob.value.jobOpening;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.responsibilities.length > 0) {
      form_Data.responsibilities = this.postJob.value.responsibilities;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.stipend.length > 0) {
      form_Data.stipend = this.postJob.value.stipend;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.salary > 0) {
      form_Data.salary = this.postJob.value.salary;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.salaryType.length > 0) {
      form_Data.salaryType = this.postJob.value.salaryType;
      console.log(form_Data, 'formValue3');
    }
    if (this.postJob.value.perks.length > 0) {
      form_Data.perks = this.postJob.value.perks;
      console.log(form_Data, 'formValue3');
    }
    // console.log(form_Data, 'form_Data');
    // const formData:SavePayload=this.postJob.value
    this.jobPost.saveJob(form_Data).subscribe({
      next: (res) => {
        this.saveDraftId = res.data._id;
        console.log(this.saveDraftId, 'savejob');
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
        this.display = true;
        this._JobPostListService
          .getSinglePortfolio(this.saveDraftId)
          .subscribe({
            next: (res) => {
              this.savedDraftData = res.data;
              console.log(this.savedDraftData, 'sdata');
            },
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
  }
  submitForm() {
    if (this.postJob.valid) {
      let formData: Payload = this.postJob.value;
      formData = {
        ...formData,
        id: this.saveDraftId ? this.saveDraftId : this.editedJobId,
      };
      if (this.saveDraftId) {
        formData.id = this.saveDraftId;
        this.display = false;
      }
      this.jobPost.submitJob(formData).subscribe({
        next: (resp) => {
          console.log(resp);
          this.display = false;
          this.router.navigateByUrl('/industry/jobs');
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: resp.message,
          });
          this.display = false;
        },
        error: (err) => {
          this.display = false;
          // this.router.navigateByUrl('/industry/jobs')

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

  editJob(id: any) {
    console.log(id);
    console.log(this.editedJobId);
    if (this.postJob.valid) {
      let formData: Payload = this.postJob.value;
      formData = {
        ...formData,
        id: this.saveDraftId ? this.saveDraftId : this.editedJobId,
      };
      if (this.saveDraftId) {
        formData.id = this.saveDraftId;
        this.display = false;
      }

      if (this.editedJobId) {
        this.jobPost.editedJob(this.editedJobId, formData).subscribe({
          next: (resp) => {
            console.log(resp);
            this.display = false;
            this.router.navigateByUrl('/industry/jobs');
            this._toast.showToaster.next({
              severity: 'success',
              summary: 'success',
              detail: resp.message,
            });
            this.display = false;
          },
          error: (err) => {
            this.display = false;
            this.router.navigateByUrl('/industry/jobs');

            this._toast.showToaster.next({
              severity: 'Error',
              summary: 'Error',
              detail: err.error.message,
            });
          },
        });
      }

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

  modalclose() {
    this.display = false;
    this.router.navigateByUrl('/industry/jobs');
  }
  edit() {
    this.display = false;
  }

  //.......................
  //   internshipSelect(e:any){
  // console.log(e.target.value)

  // this.title=e.target.value;
  // }
  typeSelect() {
    let type = this.postJob.get('type')?.value;
    console.log(type);
    this.title = type;
    this.formvisibility = true;
    if (type == 'intranship') {
      this.intranshipContent = true;
      this.jobContent = false;
      this.salaryType = 'Stipend';
    }
    if (type == 'job') {
      this.intranshipContent = false;
      this.jobContent = true;
      this.salaryType = 'Salary';
    }
    this.submitButtonVisibility = false;
    this.resetbuttonVisibility = true;
  }
  typeReset() {
    this.formvisibility = false;
    this.intranshipContent = false;
    this.jobContent = false;
    this.salaryType = '';
    this.postJob.reset();
    this.submitButtonVisibility = true;
    this.resetbuttonVisibility = false;
  }
}
