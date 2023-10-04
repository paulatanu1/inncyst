import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InternshipProfileService } from '../service/internship-profile.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/service/toast-service.service';

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
  location:  string;
  description:  string;
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
  ProfileDetails!: IprofileDetails;
  profile: Subscription | undefined;
  editProfile: boolean = false;
  profileForm: FormGroup = new FormGroup({});
  imageChangedEvent: any;
  cropperModal: boolean = false;
  imagePath: string = '';
  cImage:any;
  constructor(
    private internship: InternshipProfileService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private _toast: ToastServiceService,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      shortDescription: [''],
      skills: [[]], // Initialize as an empty array
      location: [' '],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      image: [''],
    });

    this.profile = this.internship
      .sendInternshipProfileRequest()
      .subscribe((response) => {
        this.ProfileDetails = response.data;
        // console.log(this.ProfileDetails)
        // console.log(this.ProfileDetails, 'ProfileDetails');
        if (this.ProfileDetails) {
          this.profileForm.patchValue(this.ProfileDetails);
          // console.log(this.profileForm, 'ii');
        }
      });
  }

  openEdit() {
    this.editProfile = true;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Form is valid, you can access form values using this.profileForm.value
      console.log(this.profileForm.value)

      this.internship.EditProfile(this.profileForm.value).subscribe({
        next:(res)=>{
                this._toast.showToaster.next({
          severity: 'success',
          summary: 'success',
          detail: res.success,
        });
        this.editProfile = false;
          console.log(res)
          // this.editProfile = false;
        },
        error:(err)=>{
          this._toast.showToaster.next({
            severity: 'error',
            summary: 'error',
            detail:err.error.message,
          });
        }
      })
      // You can send the form data to your backend or perform other actions here
    } else {
      // Form is invalid, display error messages or perform other actions as needed
    }
  }

  ImgCroppedDone(event: Event) {
    // console.log(event, 'event done');
  }

  CancelImgCroppedDone() {}

  loadImageFailed() {
    // throw new Error('Method not implemented.');
  }
  cropperReady() {
    // throw new Error('Method not implemented.');
  }
  imageLoaded() {
    // throw new Error('Method not implemented.');
    // console.log('loaded');
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl as string
    );
   this.cImage= event.objectUrl;
    console.log(this.cImage)
    // console.log(event.objectUrl)
    // console.log(this.croppedImage, 'ci');
    // event.blob can be used to upload the cropped image
  }

  fileChangeEvent(event: any): void {
    // console.log(event, 'event');
    // console.log(this.cropper.nativeElement, 'this.cropper.nativeElement');
    // this.cropper.nativeElement.toggle();
    this.imageChangedEvent = event;
    this.cropperModal = true;
    // console.log(this.imageChangedEvent,'img')
  }
  back() {
    this.router.navigateByUrl('/jobs/internships');
  }

  croppedComplete() {
    this.cropperModal = false;
    this.imagePath = this.croppedImage;
    // console.log(this.imagePath , 'path');
    this.ProfileDetails.image= this.cImage
    this.profileForm.patchValue(this.ProfileDetails)
    // console.log(this.profileForm)
  }
  ngOnDestroy() {
    this.profile?.unsubscribe();
  }
}
