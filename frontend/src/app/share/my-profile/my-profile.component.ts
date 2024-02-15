import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { InternshipProfileService } from '../service/internship-profile.service';
import { Subscription } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

interface IprofileDetails {
  name: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  verified: boolean;
  question_step: boolean;
  status: boolean;
  createdAt: string;
  location: string;
  description: string;
  skills: string[];
}
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit{
  croppedImage: any;
  @ViewChild('cropper') cropper!: ElementRef;
  ProfileDetails: any;
  profile: Subscription | undefined;
  editProfile: boolean = false;
  profileForm: FormGroup = new FormGroup({});
  imageChangedEvent: any;
  cropperModal: boolean = false;
  imagePath: string = '';
  cImage: any;
  @ViewChild('fileInput', { static: true })
  fileInput!: ElementRef<HTMLInputElement>;
  description: string = 'Please Add Your Description';
  skillSet: [] = [];
  skillLength!: number;
  genderList = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Cant say', value: 'cantsay' },
  ];
  branchList = [
    { name: 'Kolkata', value: 'kolkata' },
    { name: 'Delhi', value: 'delhi' },
  ];
  streamList = [
    { name: 'BCA', value: 'bca' },
    { name: 'MCA', value: 'mca' },
  ];
  semesterList = [
    { name: 'I', value: '1' },
    { name: 'II', value: '2' },
    { name: 'III', value: '3' },
    { name: 'IV', value: '4' },
    { name: 'V', value: '5' },
    { name: 'VI', value: '6' },
    { name: 'VII', value: '7' },
    { name: 'VIII', value: '8' },
  ];
  status!: number;
  constructor(
    private internship: InternshipProfileService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private _toast: ToastServiceService,
    private datePipe: DatePipe,
    private activatedRoute:ActivatedRoute
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      location: [''],
      gender: ['male'],
      dob: [''],
      areaOfInterest: [''],
      semester: ['1'],
      stream: [''],
      branch: ['kolkata'],
      institution: [''],

      skills: this.formBuilder.array([]), // Initialize as an empty array
      image: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
//get querryParams
this.activatedRoute.queryParamMap.subscribe({
  next: (param) => {
    this.status =<any> param.get('status');
  },
});


    this.getProfileDetails();
    //for scroll issue
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  get skillsArray() {
    return this.profileForm.get('skills') as FormArray;
  }

  getSkillsArrayControls() {
    return (this.profileForm.get('skills') as FormArray).controls;
  }

  addnewSkill() {
    this.skillsArray.push(new FormControl());
  }
  removeSkill(index: any) {
    this.skillsArray.removeAt(index);
  }

  getProfileDetails() {
    this.profile = this.internship
      .sendInternshipProfileRequest()
      .subscribe((response) => {
        this.ProfileDetails = response.data;
        console.log(this.ProfileDetails);
        this.imagePath = this.ProfileDetails?.image;
        if (this.ProfileDetails) {
          this.imagePath = this.ProfileDetails.image;
          this.description = this.ProfileDetails.description;
          this.skillSet = this.ProfileDetails.skills;
          this.skillLength = this.ProfileDetails.skills.length;
          this.profileForm.get('name')?.patchValue(this.ProfileDetails.name);
          this.profileForm.get('phone')?.patchValue(this.ProfileDetails.phone);
          this.profileForm.get('email')?.patchValue(this.ProfileDetails.email);
          this.profileForm
            .get('location')
            ?.patchValue(this.ProfileDetails.location);
          this.profileForm
            .get('gender:')
            ?.patchValue(this.ProfileDetails.gender);
          this.profileForm.get('dob')?.patchValue(this.ProfileDetails.image);
          this.profileForm
            .get('areaOfInterest')
            ?.patchValue(this.ProfileDetails.areaOfInterest);
          this.profileForm
            .get('semester')
            ?.patchValue(this.ProfileDetails.semester);
          this.profileForm
            .get('stream')
            ?.patchValue(this.ProfileDetails.stream);
          this.profileForm
            .get('branch')
            ?.patchValue(this.ProfileDetails.branch);
          this.profileForm
            .get('institution')
            ?.patchValue(this.ProfileDetails.institution);
          this.profileForm.get('image')?.patchValue(this.ProfileDetails.image);
          this.profileForm
            .get('description')
            ?.patchValue(this.ProfileDetails.description);

          console.log(this.skillLength);
          if (this.skillLength) {
            for (let i = 1; i <= this.skillLength; i++) {
             
              this.addnewSkill();
              if (i == this.skillLength) {
                this.profileForm
                  .get('skills')
                  ?.setValue(this.ProfileDetails.skills);
              }
            }
          }
        }
      });

    //for scroll issue
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    });
  }

  openEdit() {
    this.editProfile = true;
  }
  dateSelect(e: any) {
    const date = this.datePipe.transform(e, 'yyy-MM-dd');
    console.log(date);
    // console.log(e)
    this.profileForm.get('dob')?.setValue(date);
  }

  onSubmit() {
    if (this.imagePath) {
      this.profileForm.get('image')?.setValue(this.imagePath);
    }
    if (this.profileForm.valid) {
      this.internship.EditProfile(this.profileForm.value).subscribe({
        next: (res) => {
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.success,
          });
          this.editProfile = false;
          // this.getProfileDetails();
        },
        error: (err) => {
          this._toast.showToaster.next({
            severity: 'error',
            summary: 'error',
            detail: err.error.message,
          });
        },
      });
    } else {
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileInput.nativeElement.value = '';
    this.profileForm.get('image')?.setValue(this.croppedImage);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.cropperModal = true;
  }
  back() {
    this.router.navigateByUrl('/jobs/posts');
  }

  croppedComplete() {
    this.cropperModal = false;
    this.imagePath = this.croppedImage;
  }

  Protfolio() {
    this.router.navigateByUrl('my-profile/protfolio');
  }
  ngOnDestroy() {
    this.profile?.unsubscribe();
  }
  // change(status: string) {
  //   this.status = status;
  //   console.log(this.status)
    
  // }
  handleChange(e:any){
this.status=e.index  
const urlTree=this.router.parseUrl(this.router.url);
    urlTree.queryParams['status']=e.index ;   
    this.router.navigateByUrl(urlTree);
}
}
