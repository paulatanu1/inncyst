import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-lab-poll-login',
  templateUrl: './lab-poll-login.component.html',
  styleUrls: ['./lab-poll-login.component.scss'],
})
export class LabPollLoginComponent implements OnInit {
  labUserReg: boolean = false;
  labReg: boolean = false;
  labUserRegistrationForm!: FormGroup;
  labForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.labUserRegistrationForm = this.fb.group({
      name: ['', [Validators.required]],
      organisation: [''],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumbers: this.fb.array([this.fb.control('')]),
      recaptcha: ['', Validators.required],
    });

    this.labForm = this.fb.group({
      labType: ['Select Lab Type', Validators.required], // Dropdown for Lab Type
      logo: [null], // Optional logo upload
      location: ['', Validators.required], // Google Maps location integration
      state: ['All', Validators.required], // Auto-fill based on location
      city: ['All', Validators.required], // Auto-fill based on location
      mobileNumbers: this.fb.array([this.createPhoneNumberField()]), // Multiple phone numbers
      accreditationValidUpto: ['', Validators.required], // Date picker
      accreditationCertificate: [null, Validators.required], // File upload
    });
  }

  public executeImportantAction(): void {
    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token) => console.log(token));
  }

  public addTokenLog(message: string, token: any) {
    console.log(`${message}:`, token);
  }

  ngOnInit(): void {}

  // Getter for phoneNumbers FormArray
  get phoneNumbers() {
    return this.labUserRegistrationForm.get('phoneNumbers') as FormArray;
  }

  // Add a new phone number field
  addPhoneNumber() {
    this.phoneNumbers.push(this.fb.control(''));
  }

  // Remove a phone number field
  removePhoneNumber(index: number) {
    if (this.phoneNumbers.length > 1) {
      this.phoneNumbers.removeAt(index);
    }
  }

  // Handle form submission
  onLabUserSubmit() {
    if (this.labUserRegistrationForm.valid) {
      console.log(this.labUserRegistrationForm.value);
    }
  }

  openRegForm(formView: string) {
    if (formView === 'lab') {
      this.labReg = true;
    } else {
      this.labUserReg = true;
    }
  }

  //lab form section
  // Create form group for phone numbers
  createPhoneNumberField() {
    return this.fb.group({
      countryCode: ['', Validators.required], // Dropdown with country codes
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)],
      ], // Number validation for a single mobile number
    });
  }

  // Getter for mobileNumbers array
  get mobileNumbers(): FormArray {
    return this.labForm.get('mobileNumbers') as FormArray;
  }

  // Method to add new phone number fields
  addPhoneNumberField() {
    this.mobileNumbers.push(this.createPhoneNumberField());
  }

  // Method to remove a phone number field
  removePhoneNumberField(index: number) {
    this.mobileNumbers.removeAt(index);
  }

  // Submit form method
  onLabFormSubmit() {
    if (this.labForm.valid) {
      console.log(this.labForm.value);
      // Process form data, e.g., submit it to a server
    }
  }
}
