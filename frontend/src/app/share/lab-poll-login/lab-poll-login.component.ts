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
      nameLab: ['', Validators.required],
      labType: ['', Validators.required],
      affiliation: ['', Validators.required],
      logo: [''],
      desclab: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      nameContactPerson: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      url: [''],
      labMobileNumbers: this.fb.array([this.createLabPhoneNumberField()]), // Initial phone field
      authlab: ['', Validators.required],
      accreditationValidUpto: ['', Validators.required],
      accreditationCertificate: [''],
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
  get labMobileNumbers(): FormArray {
    return this.labForm.get('labMobileNumbers') as FormArray;
  }

  // Create a phone number field with validation
  createLabPhoneNumberField(): FormGroup {
    return this.fb.group({
      countryCode: ['+91', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
    });
  }

  // Add a new phone number field
  addLabPhoneNumberField(): void {
    this.labMobileNumbers.push(this.createLabPhoneNumberField());
  }

  // Remove a specific phone number field
  removeLabPhoneNumberField(index: number): void {
    if (this.labMobileNumbers.length > 1) {
      this.labMobileNumbers.removeAt(index);
    }
  }

  // Remove blank fields except the first one
  onLabRegistrationSubmit(): void {
    const mobileControls = this.labMobileNumbers.controls;
    if (mobileControls.length > 1) {
      for (let i = mobileControls.length - 1; i > 0; i--) {
        const mobileControl = mobileControls[i];
        if (!mobileControl.get('mobileNumber')?.value) {
          this.labMobileNumbers.removeAt(i);
        }
      }
    }
    console.log(this.labForm.value);

    if (this.labForm.valid) {
      // Submit form logic
      console.log('Form Submitted:', this.labForm.value);
    }
  }
}
