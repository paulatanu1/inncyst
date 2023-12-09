import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  durationIn:string;
  jobOpening: number;
  responsibilities: [];
  salary: number;
  salaryType: string;
  perks: string;
  id?: string;
  location: string;
  experienceTime:string;
  education:string
  experience:number

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
  experience:number
  location: string;
}
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent implements OnInit, AfterViewInit {
  @ViewChild('job', {static: false}) jobChecked!:ElementRef
  @ViewChild('internship', {static: false}) internshipChecked!:ElementRef

  industryType: string | undefined;
  industryForm!: FormGroup;
  jobForm!:FormGroup;
  cities: cities[];
  education: Ieducation[];
  experienceTime: IexperienceTime[];
  city!: string;
  // postJob: FormGroup;
  saveDraftId!: string;
  editedJobId!: string;
editedJobType!:string
  editedJobData: any;
  editedinternshipData:any
industryTypeFalse!:string;
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
    // this.postJob = this.fb.group({
    //   type: [''],
    //   details: [''],
    //   skills: [[]],
    //   intranshipType: [''],
    //   startDate: [undefined],
    //   duration: [''],
    //   durationIn: [this.cities[0].optionName],
    //   education: ['hs'],
    //   experience: [undefined],
    //   experienceTime: ['months'],
    //   jobOpening: [0],
    //   responsibilities: [[]],
    //   stipend: [''],
    //   salary: [],
    //   salaryType: [this.cities[0].optionName],
    //   perks: [[]],
    //   location: [''],
    // });
  
    this.industryForm = this.fb.group({
      type: ['intranship'],
      details: [''],
      skills: [[]],
      intranshipType: [''],
      startDate: [undefined],
      duration: [''],
      durationIn: [this.cities[0].optionName],
      education: ['hs'],
      jobOpening: [0],
      salary: [],
      salaryType: [this.cities[0].optionName],
      perks: [[]],
      location: [''],
      stipend: [''],
    });

    this.jobForm=this.fb.group({
      type: ['job'],
      details: [''],
      skills: [[]],
      intranshipType: [''],
      education: ['hs'],
      experience: [undefined],
      experienceTime: ['months'],
      jobOpening: [0],
      responsibilities: [[]],
      stipend: [''],
      salary: [],
      salaryType: [this.cities[0].optionName],
      perks: [[]],
      location: [''],
    })
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
        console.log(res, 'kk');
        this.editedJobId = res['id'];
this.editedJobType=res['type'];

       if(this.editedJobType == 'job'){
        this.industryType='job'
       }
       if(this.editedJobType == 'intranship'){
        this.industryType='internship'
       }
        if (this.editedJobId != undefined) {
          this._JobPostListService
            .getSinglePortfolio(this.editedJobId)
            .subscribe({
              next: (res) => {
                console.log(res.data);

                if (res.data.type) {
                  if(res.data.type == 'intranship'){
                    this.industryTypeFalse='internship';
                    this.typeSelection();
                    this.editedinternshipData = res.data;
                    this.status = this.editedinternshipData.status;

                    this.industryForm.get('type')?.patchValue(this.editedinternshipData.type);
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
                  }
                  
                }
                if(res.data.type == 'job'){
                  this.industryTypeFalse='job';
                  this.typeSelection();
                    this.editedJobData = res.data;
                    this.status = this.editedJobData.status;
                    this.jobForm.get('type')?.patchValue(this.editedJobData.type);
                    this.jobForm
                  .get('details')
                  ?.patchValue(this.editedJobData.details);
                  this.jobForm
                  .get('skills')
                  ?.patchValue(this.editedJobData.skills);
                  this.jobForm
                  .get('intranshipType')
                  ?.patchValue(this.editedJobData.intranshipType);
                  this.jobForm
                  .get('details')
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
                  
                }

              //   this.postJob.get('type')?.patchValue(this.editedJobData.type);
              //   this.postJob
              //     .get('details')
              //     ?.patchValue(this.editedJobData.details);
              //   this.postJob
              //     .get('location')
              //     ?.patchValue(this.editedJobData.location);
              //   this.postJob
              //     .get('skills')
              //     ?.patchValue(this.editedJobData.skills);
              //   this.postJob
              //     .get('intranshipType')
              //     ?.patchValue(this.editedJobData.intranshipType);
              //   this.postJob
              //     .get('education')
              //     ?.patchValue(this.editedJobData.education);
              //   this.postJob
              //     .get('experienceTime')
              //     ?.patchValue(this.editedJobData.experienceTime);
              //   this.postJob
              //     .get('experience')
              //     ?.patchValue(this.editedJobData.experience);
              //   this.postJob
              //     .get('startDate')
              //     ?.patchValue(this.editedJobData.startDate);
              //   this.postJob
              //     .get('duration')
              //     ?.patchValue(this.editedJobData.duration);
              //   this.postJob
              //     .get('jobOpening')
              //     ?.patchValue(this.editedJobData.jobOpening);
              //   this.postJob
              //     .get('responsibilities')
              //     ?.patchValue(this.editedJobData.responsibilities);
              //   this.postJob
              //     .get('stipend')
              //     ?.patchValue(this.editedJobData.stipend);
              //   this.postJob
              //     .get('salary')
              //     ?.patchValue(this.editedJobData.salary);
              //   this.postJob
              //     .get('salaryType')
              //     ?.patchValue(this.editedJobData.salaryType);
              //   this.postJob.get('perks')?.patchValue(this.editedJobData.perks);
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
  


  //internship save preview
internshipSavePreveiw(){
  alert('kkk')
    console.log(this.industryForm.value, 'formValue');
    const form_Data: any = new Object();
    if (this.industryForm.value.type) {
      form_Data.type = this.industryForm.value.type;
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
    if (this.industryForm.value.duration.length > 0) {
      form_Data.duration = this.industryForm.value.duration;
    }
    if (this.industryForm.value.durationIn.length > 0) {
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
  //job save preview
save_preview_job() {
  console.log(this.jobForm.value, 'formValue');
  const form_Data: any = new Object();
  if (this.jobForm.value.type) {
    form_Data.type = this.jobForm.value.type;
  }
  if (this.jobForm.value.location) {
    form_Data.location = this.jobForm.value.location;
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
  if (this.jobForm.value.skills.length > 0) {
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
  editJob(id: any) {
    console.log(id);
    console.log(this.editedJobId);
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
  editInternship(id:any){
    console.log(id)
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


internshipSubmitForm(){
  console.log(this.industryForm.value)
}

jobSubmitForm(){
console.log(this.jobForm.value)
}


//type select

typeSelection(){
  
  this.industryType=this.industryTypeFalse;
  console.log(this.industryType)
  if(this.industryType == 'job'){
    this.industryForm.reset();
  }
  if(this.industryType == 'internship'){
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
   this.jobChecked.nativeElement.checked=false
   this.internshipChecked.nativeElement.checked=false
    this.industryType=undefined;
    this.industryForm.reset();
        this.jobForm.reset();

  }

  submitFormjob(){
    console.log(this.jobForm.value)
  if (this.jobForm.valid) {
    let formData = this.jobForm.value;
    console.log(formData);
    formData = {
      ...formData,
      id: this.saveDraftId ? this.saveDraftId : this.editedJobId,
    };
    console.log(formData, 'psj');
    if (this.saveDraftId) {
      formData.id = this.saveDraftId;
      this.display = false;
    }
    this.jobPost.internshipSubmit(formData).subscribe({
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
//final submit internship
submitFormInternship(){
  console.log(this.industryForm.value)
  if (this.industryForm.valid) {
    let formData = this.industryForm.value;
    console.log(formData);
    formData = {
      ...formData,
      id: this.saveDraftId ? this.saveDraftId : this.editedJobId,
    };
    console.log(formData, 'psj');
    if (this.saveDraftId) {
      formData.id = this.saveDraftId;
      this.display = false;
    }
    this.jobPost.internshipSubmit(formData).subscribe({
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
