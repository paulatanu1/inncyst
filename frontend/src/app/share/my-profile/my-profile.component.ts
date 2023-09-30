import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InternshipProfileService } from '../service/internship-profile.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface IprofileDetails {
  name: string;
  email: string;
  phone: string;
  image: null;
  role: string;
  verified: boolean;
  question_step: boolean;
  status: boolean;
  createdAt: string;
  location: null | string;
  description: null | string;
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
  constructor(
    private internship: InternshipProfileService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router:Router
  ) {}

  ngOnInit(): void {
  
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      shortDescription: ['', Validators.required],
      skills: [[]], // Initialize as an empty array
      location: [''],
      phone: ['', Validators.required],
      email: ['lllllllllllll', Validators.required],
    });

    this.profile = this.internship
      .sendInternshipProfileRequest()
      .subscribe((response) => {
        this.ProfileDetails = response.data;
        console.log(this.ProfileDetails,'ProfileDetails');
      });
      if(this.ProfileDetails){

        this.profileForm.patchValue({
          shortDescription:this.ProfileDetails.email
        });
      }
  }

  openEdit() {
    this.editProfile = true;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Form is valid, you can access form values using this.profileForm.value
      console.log(this.profileForm.value);

      // You can send the form data to your backend or perform other actions here
    } else {
      // Form is invalid, display error messages or perform other actions as needed
    }
  }

  ImgCroppedDone(event: Event) {
    console.log(event, 'event done');
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
    console.log('loaded');
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl as string
    );
    // event.blob can be used to upload the cropped image
  }

  fileChangeEvent(event: any): void {
    console.log(event, 'event');
    console.log(this.cropper.nativeElement, 'this.cropper.nativeElement');
    // this.cropper.nativeElement.toggle();
    this.imageChangedEvent = event;
  }
  back(){
    this.router.navigateByUrl('/jobs/internships')
  }
  ngOnDestroy() {
    this.profile?.unsubscribe();
  }
}
