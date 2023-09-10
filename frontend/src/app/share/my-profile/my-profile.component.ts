import { Component, OnInit } from '@angular/core';
import { InternshipProfileService } from '../service/internship-profile.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

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
  loadImageFailed() {
    throw new Error('Method not implemented.');
  }
  cropperReady() {
    throw new Error('Method not implemented.');
  }
  imageLoaded() {
    throw new Error('Method not implemented.');
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl as string
    );
    // event.blob can be used to upload the cropped image
  }
  imageChangedEvent: any;
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  ProfileDetails!: IprofileDetails;
  profile: Subscription | undefined;
  editProfile: boolean = false;
  profileForm: FormGroup = new FormGroup({});

  constructor(
    private internship: InternshipProfileService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      shortDescription: ['', Validators.required],
      skills: [[]], // Initialize as an empty array
      location: [''],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.profile = this.internship
      .sendInternshipProfileRequest()
      .subscribe((response) => {
        this.ProfileDetails = response.data;
        console.log(this.ProfileDetails);
      });
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

  ngOnDestroy() {
    this.profile?.unsubscribe();
  }
}
