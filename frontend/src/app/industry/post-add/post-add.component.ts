import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  durationIn: string;
  jobOpening: number;
  responsibilities: [];
  salary: number;
  salaryType: string;
  perks: string;
  id?: string;
  location: string;
  experienceTime: string;
  education: string;
  experience: number;
}
interface SavePayload {
  type?: string;
  details?: string;
  skills?: string[];
  intranshipType?: string;
  startDate?: string;
  duration?: string;
  jobOpening?: number;
  responsibilities?: [];
  stipend?: string;
  salary?: string;
  salaryType?: string;
  perks?: string;
  id?: string;
  experience: number;
  location: string;
}

interface IskillSet {
  name: string;
  code: number;
}
interface Icurrency {
  currenctType: string;
  code: string;
}
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent implements OnInit, AfterViewInit {
  @ViewChild('job', { static: false }) jobChecked!: ElementRef;
  @ViewChild('internship', { static: false }) internshipChecked!: ElementRef;

  industryType: string | undefined;
  industryForm!: FormGroup;
  jobForm!: FormGroup;
  cities: cities[];
  education: Ieducation[];
  experienceTime: IexperienceTime[];
  city!: string;
  // postJob: FormGroup;
  saveDraftId!: string;
  editedJobId!: string;
  editedJobType!: string;
  editedJobData: any;
  editedinternshipData: any;
  industryTypeFalse!: string;
  obj: any;
  display: boolean = false;
  savedDraftData: any = {};
  status!: boolean;
  savedDraftCoverLetterData = {};
  EditInternship = false;
  EditJob = false;
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
  skillList: IskillSet[] = [];

  //   this.cities = [
  //     {name: 'New York', code: 'NY'},
  //     {name: 'Rome', code: 'RM'},
  //     {name: 'London', code: 'LDN'},
  //     {name: 'Istanbul', code: 'IST'},
  //     {name: 'Paris', code: 'PRS'}
  // ];
  currency!: Icurrency[];
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

    const industryPhone = localStorage.getItem('industry-phone');
    console.log(industryPhone, 'phone');

    this.industryForm = this.fb.group({
      type: ['intranship'],
      title: [''],
      details: [''],
      skills: [[]],
      intranshipType: [''],
      startDate: [undefined],
      duration: [''],
      durationIn: [this.cities[0].optionName],
      jobOpening: [0],
      salary: [],
      salaryType: [this.cities[0].optionName],
      perks: [[]],
      location: [''],
      stipend: [''],
      letter: [''],
      availability: [''],
      moreQuestions: [[]],
      jobType: [],
      salaryIn: [],
      responsiblity: [''],
      addtionalCandidatePreference: [''],
      alternativePhone: [industryPhone],
      womenRestart: [],
    });

    this.jobForm = this.fb.group({
      type: ['job'],
      title: [''],
      details: [''],
      skills: [[]],
      intranshipType: [''],
      education: ['hs'],
      experience: [undefined],
      experienceTime: ['months'],
      jobOpening: [0],
      responsibilities: [[]],
      stipend: [''],
      // salary: [],
      salaryType: [this.cities[0].optionName],
      perks: [[]],
      location: [''],
      letter: [''],
      availability: [''],
      moreQuestions: [[]],
      alternativeMobile: [localStorage.getItem('industry-phone')],
      jobDescription: [''],
      preferencesAdditional: [''],
      probationPeriod: [''],
      jobType: [],
      ctcFrom: [],
      ctcTo: [],
      currencyType: ['Inr'],
    });

    this.currency = [{ currenctType: 'INR', code: 'ind' }];
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
    this.getSkillLists();
    this._menuHandel.leftMenuActive.next(1);
    window.scrollTo(0, 0);

    //when edit posted job or any saved job then get id
    this.activatedRoute.queryParams.subscribe({
      next: (res: any) => {
        this.editedJobId = res['id'];
        this.editedJobType = res['type'];

        if (this.editedJobType == 'job') {
          this.industryType = 'job';
        }
        if (this.editedJobType == 'intranship') {
          this.industryType = 'internship';
        }
        if (this.editedJobId != undefined) {
          this._JobPostListService
            .getSinglePortfolio(this.editedJobId)
            .subscribe({
              next: (res) => {
                if (res.data.type) {
                  if (res.data.type == 'intranship') {
                    this.industryTypeFalse = 'internship';
                    this.typeSelection();
                    this.editedinternshipData = res.data;
                    this.EditInternship = true;
                    //  this.industryForm.disable();
                    this.status = this.editedinternshipData.status;
                    this.industryForm
                      .get('title')
                      ?.patchValue(this.editedinternshipData.title);
                    this.industryForm
                      .get('type')
                      ?.patchValue(this.editedinternshipData.type);
                    this.industryForm
                      .get('details')
                      ?.patchValue(this.editedinternshipData.details);
                    this.industryForm
                      .get('skills')
                      ?.patchValue(this.editedinternshipData.skills);
                    this.industryForm
                      .get('intranshipType')
                      ?.patchValue(this.editedinternshipData.intranshipType);
                    this.industryForm
                      .get('startDate')
                      ?.patchValue(this.editedinternshipData.startDate);
                    this.industryForm
                      .get('education')
                      ?.patchValue(this.editedinternshipData.education);
                    this.industryForm
                      .get('jobOpening')
                      ?.patchValue(this.editedinternshipData.jobOpening);
                    this.industryForm
                      .get('salary')
                      ?.patchValue(this.editedinternshipData.salary);
                    this.industryForm
                      .get('salaryType')
                      ?.patchValue(this.editedinternshipData.salaryType);
                    this.industryForm
                      .get('perks')
                      ?.patchValue(this.editedinternshipData.perks);
                    this.industryForm
                      .get('location')
                      ?.patchValue(this.editedinternshipData.location);
                    this.industryForm
                      .get('stipend')
                      ?.patchValue(this.editedinternshipData.stipend);
                    this.industryForm
                      .get('duration')
                      ?.patchValue(this.editedinternshipData.duration);
                    this.industryForm
                      .get('durationIn')
                      ?.patchValue(this.editedinternshipData.durationIn);
                    this.industryForm
                      .get('letter')
                      ?.patchValue(
                        this.editedinternshipData?.coverLetter?.letter
                      );
                    this.industryForm
                      .get('availability')
                      ?.patchValue(
                        this.editedinternshipData?.coverLetter?.availability
                      );
                    this.industryForm
                      .get('moreQuestions')
                      ?.patchValue(
                        this.editedinternshipData?.coverLetter?.moreQuestions
                      );
                  }
                }
                if (res.data.type == 'job') {
                  this.industryTypeFalse = 'job';
                  this.typeSelection();
                  this.editedJobData = res.data;
                  this.EditJob = true;
                  // this.jobForm.disable();
                  this.status = this.editedJobData.status;
                  this.jobForm.get('type')?.patchValue(this.editedJobData.type);
                  this.jobForm.get('details')?.patchValue(res.data.details);
                  this.jobForm.get('title')?.patchValue(res.data.title);
                  this.jobForm
                    .get('skills')
                    ?.patchValue(this.editedJobData.skills);
                  this.jobForm
                    .get('intranshipType')
                    ?.patchValue(this.editedJobData.intranshipType);
                  this.jobForm
                    .get('education')
                    ?.patchValue(this.editedJobData.education);
                  this.jobForm
                    .get('experience')
                    ?.patchValue(this.editedJobData.experience);
                  this.jobForm
                    .get('experienceTime')
                    ?.patchValue(this.editedJobData.experienceTime);
                  this.jobForm
                    .get('jobOpening')
                    ?.patchValue(this.editedJobData.jobOpening);
                  this.jobForm
                    .get('responsibilities')
                    ?.patchValue(this.editedJobData.responsibilities);
                  this.jobForm
                    .get('stipend')
                    ?.patchValue(this.editedJobData.stipend);
                  this.jobForm
                    .get('salary')
                    ?.patchValue(this.editedJobData.salary);
                  this.jobForm
                    .get('salaryType')
                    ?.patchValue(this.editedJobData.salaryType);
                  this.jobForm
                    .get('perks')
                    ?.patchValue(this.editedJobData.perks);
                  this.jobForm
                    .get('location')
                    ?.patchValue(this.editedJobData.location);

                  this.jobForm
                    .get('letter')
                    ?.patchValue(this.editedJobData?.coverLetter?.letter);
                  this.jobForm
                    .get('availability')
                    ?.patchValue(this.editedJobData?.coverLetter?.availability);
                  this.jobForm
                    .get('moreQuestions')
                    ?.patchValue(
                      this.editedJobData?.coverLetter?.moreQuestions
                    );
                }
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

  getSkillLists() {
    this.jobPost.fetchSkills().subscribe({
      next: (res) => {
        this.skillList = res.result.map((skill: any) => ({ skills: skill }));
        console.log(this.skillList);
      },
      error: (err) => {},
    });
  }

  internshipFormEnable() {
    this.EditInternship = false;
    this.industryForm.enable();
  }
  jobFormEnable() {
    this.EditJob = false;
    this.jobForm.enable();
  }
  //internship save preview
  internshipSavePreveiw() {
    const form_Data: any = new Object();
    if (this.industryForm.value.type) {
      form_Data.type = this.industryForm.value.type;
    }
    if (this.industryForm.value.title) {
      form_Data.title = this.industryForm.value.title;
    }
    if (this.industryForm.value.location) {
      form_Data.location = this.industryForm.value.location;
    }
    if (this.industryForm.value.education) {
      form_Data.education = this.industryForm.value.education;
    }
    if (this.industryForm.value.details) {
      form_Data.details = this.industryForm.value.details;
    }
    if (this.industryForm.value.skills.length > 0) {
      form_Data.skills = this.industryForm.value.skills;
    }
    if (this.industryForm.value.intranshipType) {
      form_Data.intranshipType = this.industryForm.value.intranshipType;
    }
    if (this.industryForm.value.startDate?.length > 0) {
      form_Data.startDate = this.industryForm.value.startDate;
    }
    if (this.industryForm.value.duration) {
      form_Data.duration = this.industryForm.value.duration;
    }
    if (this.industryForm.value.durationIn.length) {
      form_Data.durationIn = this.industryForm.value.durationIn;
    }
    if (this.industryForm.value.jobOpening > 0) {
      form_Data.jobOpening = this.industryForm.value.jobOpening;
    }
    if (this.industryForm.value.stipend.length > 0) {
      form_Data.stipend = this.industryForm.value.stipend;
    }
    if (this.industryForm.value.salary > 0) {
      form_Data.salary = this.industryForm.value.salary;
    }
    if (this.industryForm.value.salaryType.length > 0) {
      form_Data.salaryType = this.industryForm.value.salaryType;
    }
    if (this.industryForm.value.perks.length > 0) {
      form_Data.perks = this.industryForm.value.perks;
    }
    if (this.saveDraftId) {
      form_Data.id = this.saveDraftId;
    }

    if (this.editedJobId) {
      form_Data.id = this.editedJobId;
    }

    if (this.industryForm.value.letter) {
      form_Data.letter = this.industryForm.value.letter;
    }
    if (this.industryForm.value.availability) {
      form_Data.availability = this.industryForm.value.availability;
    }
    if (this.industryForm.value.moreQuestions?.length > 0) {
      form_Data.moreQuestions = this.industryForm.value.moreQuestions;
    }
    // console.log(form_Data, 'form_Data');
    // const formData:SavePayload=this.postJob.value
    this.jobPost.saveJob(form_Data).subscribe({
      next: (res) => {
        this.saveDraftId = res.data._id;
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
        this.display = true;
        this.EditInternship = true;
        // this.industryForm.disable();
        this._JobPostListService
          .getSinglePortfolio(this.saveDraftId)
          .subscribe({
            next: (res) => {
              this.savedDraftData = res.data;
              // this.  savedDraftCoverLetterData=res.data.
            },
          });
      },
      error: (err) => {
        this._toast.showToaster.next({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
      },
    });
  }
  //job save preview
  save_preview_job() {
    this.jobForm.value.skills = this.jobForm.value.skills.map(
      (skillObject: { skills: any }) => skillObject.skills
    );
    const form_Data: any = new Object();
    console.log(this.jobForm.value);
    if (this.jobForm.value.type) {
      form_Data.type = this.jobForm.value.type;
    }
    if (this.jobForm.value.location) {
      form_Data.location = this.jobForm.value.location;
    }
    if (this.jobForm.value.title) {
      form_Data.title = this.jobForm.value.title;
    }
    if (this.jobForm.value.education) {
      form_Data.education = this.jobForm.value.education;
    }
    if (this.jobForm.value.experienceTime) {
      form_Data.experienceTime = this.jobForm.value.experienceTime;
    }
    if (this.jobForm.value.experience) {
      form_Data.experience = this.jobForm.value.experience;
    }
    if (this.jobForm.value.details) {
      form_Data.details = this.jobForm.value.details;
    }
    if (this.jobForm.value.skills?.length > 0) {
      form_Data.skills = this.jobForm.value.skills;
    }
    if (this.jobForm.value.jobOpening > 0) {
      form_Data.jobOpening = this.jobForm.value.jobOpening;
    }
    if (this.jobForm.value.responsibilities.length) {
      form_Data.responsibilities = this.jobForm.value.responsibilities;
    }
    if (this.jobForm.value.stipend.length > 0) {
      form_Data.stipend = this.jobForm.value.stipend;
    }
    if (this.jobForm.value.salary > 0) {
      form_Data.salary = this.jobForm.value.salary;
    }
    if (this.jobForm.value.salaryType) {
      form_Data.salaryType = this.jobForm.value.salaryType;
    }
    if (this.jobForm.value.perks.length > 0) {
      form_Data.perks = this.jobForm.value.perks;
    }

    if (this.saveDraftId) {
      form_Data.id = this.saveDraftId;
    }
    if (this.editedJobId) {
      form_Data.id = this.editedJobId;
    }

    if (this.jobForm.value.letter) {
      form_Data.letter = this.jobForm.value.letter;
    }
    if (this.jobForm.value.availability) {
      form_Data.availability = this.jobForm.value.availability;
    }
    if (this.jobForm.value.moreQuestions?.length > 0) {
      form_Data.moreQuestions = this.jobForm.value.moreQuestions;
    }
    if (this.jobForm.value.skills?.length > 0) {
      form_Data.skills = this.jobForm.value.skills;
    }
    if (this.jobForm.value.currency) {
      form_Data.currency = this.jobForm.value.currency;
    }
    if (this.jobForm.value.currency) {
      form_Data.ctcFrom = this.jobForm.value.currency;
    }
    if (this.jobForm.value.currency) {
      form_Data.ctcTo = this.jobForm.value.currency;
    }
    if (this.jobForm.value.currency) {
      form_Data.isProbationPeriod = this.jobForm.value.currency;
    }
    if (this.jobForm.value.currency) {
      form_Data.addtionalCandidatePreference = this.jobForm.value.currency;
    }
    if (this.jobForm.value.alternativeMobile) {
      form_Data.alternativeMobile = this.jobForm.value.alternativeMobile;
    }
    // console.log(form_Data, 'form_Data');
    // const formData:SavePayload=this.postJob.value
    this.jobPost.saveJob2(form_Data).subscribe({
      next: (res) => {
        this.saveDraftId = res.data._id;
        this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.message,
        });
        this.display = true;
        this.EditJob = true;
        // this.jobForm.disable();
        this._JobPostListService
          .getSinglePortfolio(this.saveDraftId)
          .subscribe({
            next: (res) => {
              this.savedDraftData = res.data;
            },
          });
      },
      error: (err) => {
        this._toast.showToaster.next({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
      },
    });
  }
  editJob(id: any) {
    // if (this.postJob.valid) {
    //   let formData: Payload = this.postJob.value;
    //   formData = {
    //     ...formData,
    //     id: this.saveDraftId ? this.saveDraftId : this.editedJobId,
    //   };
    //   if (this.saveDraftId) {
    //     formData.id = this.saveDraftId;
    //     this.display = false;
    //   }
    //   if (this.editedJobId) {
    //     this.jobPost.editedJob(this.editedJobId, formData).subscribe({
    //       next: (resp) => {
    //         console.log(resp);
    //         this.display = false;
    //         this.router.navigateByUrl('/industry/jobs');
    //         this._toast.showToaster.next({
    //           severity: 'success',
    //           summary: 'success',
    //           detail: resp.message,
    //         });
    //         this.display = false;
    //       },
    //       error: (err) => {
    //         this.display = false;
    //         this.router.navigateByUrl('/industry/jobs');
    //         this._toast.showToaster.next({
    //           severity: 'Error',
    //           summary: 'Error',
    //           detail: err.error.message,
    //         });
    //       },
    //     });
    //   }
    //   // Now you can use formData to send the data to your API
    //   console.log(formData);
    //   // Clear the form or perform any necessary actions
    //   // this.postJob.reset();
    // }
  }
  editInternship(id: any) {}
  handleInternshipRadioButtonChange(event: Event) {}

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
  //   typeSelect() {
  // console.log(this.industryType);
  //     let type = this.postJob.get('type')?.value;
  //     console.log(type);
  //     this.title = type;
  //     this.formvisibility = true;
  //     if (type == 'intranship') {
  //       this.intranshipContent = true;
  //       this.jobContent = false;
  //       this.salaryType = 'Stipend';
  //     }
  //     if (type == 'job') {
  //       this.intranshipContent = false;
  //       this.jobContent = true;
  //       this.salaryType = 'Salary';
  //     }
  //     this.submitButtonVisibility = false;
  //     this.resetbuttonVisibility = true;
  //   }
  // typeReset() {
  //   // this.formvisibility = false;
  //   // this.intranshipContent = false;
  //   // this.jobContent = false;
  //   // this.salaryType = '';
  //   // this.submitButtonVisibility = true;
  //   // this.resetbuttonVisibility = false;
  //   // this.postJob.reset();
  //   this.industryType=undefined;
  //   this.industryForm.reset();
  //   this.jobForm.reset();

  // }

  internshipSubmitForm() {}

  jobSubmitForm() {}

  //type select

  typeSelection() {
    this.industryType = this.industryTypeFalse;
    if (this.industryType == 'job') {
      this.industryForm.reset();
    }
    if (this.industryType == 'internship') {
      this.jobForm.reset();
    }
  }

  // type reset
  typeReset() {
    // this.formvisibility = false;
    // this.intranshipContent = false;
    // this.jobContent = false;
    // this.salaryType = '';
    // this.submitButtonVisibility = true;
    // this.resetbuttonVisibility = false;
    // this.postJob.reset();
    this.jobChecked.nativeElement.checked = false;
    this.internshipChecked.nativeElement.checked = false;
    this.industryType = undefined;
    this.industryForm.reset();
    this.jobForm.reset();
  }

  submitFormjob() {
    if (this.jobForm.valid) {
      let formData = this.jobForm.value;
      formData = {
        ...formData,
        id: this.saveDraftId ? this.saveDraftId : this.editedJobId,
      };
      if (this.saveDraftId) {
        formData.id = this.saveDraftId;
        this.display = false;
      }
      this.jobPost.internshipSubmit(formData).subscribe({
        next: (resp) => {
          this.jobForm.disable();
          this.display = false;
          this.router.navigateByUrl('/industry/jobs');
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: resp.message,
          });
          this.display = false;
          this.EditJob = true;
          this.jobForm.disable();
        },
        error: (err) => {
          this.display = false;
          // this.router.navigateByUrl('/industry/jobs')
          this.jobForm.enable();
          this._toast.showToaster.next({
            severity: 'error',
            summary: 'rror',
            detail: err.error.message,
          });
        },
      });

      // Now you can use formData to send the data to your API

      // Clear the form or perform any necessary actions
      // this.postJob.reset();
    } else {
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'rror',
        detail: 'please fillup all the field',
      });
    }
  }
  //final submit internship
  submitFormInternship() {
    this.industryForm.value.skills = this.industryForm.value.skills.map(
      (skillObject: { skills: any }) => skillObject.skills
    );
    console.log(this.industryForm.value);
    // return;
    if (this.industryForm.valid) {
      let formData = this.industryForm.value;
      formData = {
        ...formData,
        id: this.saveDraftId ? this.saveDraftId : this.editedJobId,
      };
      if (this.saveDraftId) {
        formData.id = this.saveDraftId;
        this.display = false;
      }
      this.jobPost.internshipSubmit(formData).subscribe({
        next: (resp) => {
          this.display = false;
          this.router.navigateByUrl('/industry/jobs');
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: resp.message,
          });
          this.display = false;
          this.industryForm.disable();
          this.EditInternship = true;
        },
        error: (err) => {
          this.display = false;
          // this.router.navigateByUrl('/industry/jobs')
          this.industryForm.enable();
          this._toast.showToaster.next({
            severity: 'error',
            summary: 'error',
            detail: err.error.message,
          });
        },
      });

      // Now you can use formData to send the data to your API

      // Clear the form or perform any necessary actions
      // this.postJob.reset();
    } else {
      this._toast.showToaster.next({
        severity: 'error',
        summary: 'error',
        detail: 'please fillup all the field',
      });
    }
  }
  onKeydownMain(event: any) {
    if (
      event.key == 0 &&
      event.charCode == 0 &&
      event.target.value.length == 0
    ) {
      event.preventDefault();
    }
  }
  // final submit job
  // submitForm() {
  //   console.log(this.postJob.value, 'submit');
  //   if (this.postJob.valid) {
  //     let formData = this.postJob.value;
  //     console.log(formData);
  //     formData = {
  //       ...formData,
  //       id: this.saveDraftId ? this.saveDraftId : this.editedJobId,
  //     };
  //     console.log(formData, 'psj');
  //     if (this.saveDraftId) {
  //       formData.id = this.saveDraftId;
  //       this.display = false;
  //     }
  // this.jobPost.submitJob(formData).subscribe({
  //       next: (resp) => {
  //         console.log(resp);
  //         this.display = false;
  //         this.router.navigateByUrl('/industry/jobs');
  //         this._toast.showToaster.next({
  //           severity: 'success',
  //           summary: 'success',
  //           detail: resp.message,
  //         });
  //         this.display = false;
  //   },
  //       error: (err) => {
  //         this.display = false;
  //         // this.router.navigateByUrl('/industry/jobs')

  //         this._toast.showToaster.next({
  //           severity: 'Error',
  //           summary: 'Error',
  //           detail: err.error.message,
  //         });
  //       },
  //     });

  //     // Now you can use formData to send the data to your API
  //     console.log(formData);

  //     // Clear the form or perform any necessary actions
  //     // this.postJob.reset();
  //   }
  // }
}
