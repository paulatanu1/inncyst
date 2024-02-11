import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InternshipProfileService } from '../service/internship-profile.service';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { environment } from 'src/environments/environment';


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
export class MyProfileComponent implements OnInit {
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
  constructor(
    private internship: InternshipProfileService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private _toast: ToastServiceService
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      skills: this.formBuilder.array([new FormControl()]), // Initialize as an empty array
      location: [''],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      image: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
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
    console.log(this.profileForm.value);
  }
  removeSkill(index: any) {
    this.skillsArray.removeAt(index);
    console.log(this.profileForm.value);
  }
 
  getProfileDetails() {
    this.profile = this.internship
      .sendInternshipProfileRequest()
      .subscribe((response) => {
        this.ProfileDetails = response.data;
 this.imagePath=this.ProfileDetails.image
        if (this.ProfileDetails) {
          this.imagePath = this.ProfileDetails.image;
          this.description = this.ProfileDetails.description;
          this.skillSet = this.ProfileDetails.skills;
          this.profileForm.get('name')?.patchValue(this.ProfileDetails.name);
          
          this.profileForm.get('description')?.patchValue(this.ProfileDetails.description);
          
          this.profileForm.get('location')?.patchValue(this.ProfileDetails.location)
          
          this.profileForm.get('phone')?.patchValue(this.ProfileDetails.phone)
          
          this.profileForm.get('email')?.patchValue(this.ProfileDetails.email)
          
          // this.profileForm.get('image')?.patchValue(this.ProfileDetails.image)
          this.profileForm.get('skills')?.patchValue(this.ProfileDetails.skills)
         this.profileForm.get('image')?.patchValue(this.ProfileDetails.image);
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

  onSubmit() {
    if (this.imagePath) {
      this.profileForm.get('image')?.setValue(this.imagePath);
    }
    if (this.profileForm.valid) {
      // Form is valid, you can access form values using this.profileForm.value
      this.internship.EditProfile(this.profileForm.value).subscribe({
        next: (res) => {
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.success,
          });
          this.editProfile = false;
          this.getProfileDetails();
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
      // Form is invalid, display error messages or perform other actions as needed
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
}
