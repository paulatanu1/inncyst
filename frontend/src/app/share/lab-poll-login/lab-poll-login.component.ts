import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UserLocationService } from 'src/app/global-component/user-location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lab-poll-login',
  templateUrl: './lab-poll-login.component.html',
  styleUrls: ['./lab-poll-login.component.scss'],
})
export class LabPollLoginComponent implements OnInit {
  labUserReg: boolean = false;
  labReg: boolean = false;
  labUserRegistrationForm!: FormGroup;
  country: string = '';
  state: string = '';
  city: string = '';
  pinCode: string = '';
  areaLocality: string = '';
  tempToken: string = '';
  // labForm: FormGroup;

  //step wise form..
  labRegForm!: FormGroup;
  fileData: { [key: string]: File } = {};
  currentStep: number = 1;

  //step wise form..

  constructor(
    private fb: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private userLocation: UserLocationService
  ) {
    this.labUserRegistrationForm = this.fb.group({
      name: ['', [Validators.required]],
      organisation: [''],
      location: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumbers: this.fb.array([this.fb.control('')]),
      recaptcha: ['', Validators.required],
    });

    this.userLocation.getLocationDetails(environment.GOOGLE_MAP_KEY).subscribe({
      next: (res) => {
        console.log(res, 'ressss');
        this.country = res.country;
        this.state = res.state;
        this.city = res.city;
        this.pinCode = res.pinCode;
        this.areaLocality = `${res.subLocality} ${res.area}`;
      },
    });

    this.labRegForm = this.fb.group({
      step1: this.fb.group({
        nameLab: ['', Validators.required],
        labType: ['', Validators.required],
        affiliation: ['', Validators.required],
        logo: [null],
      }),
      step2: this.fb.group({
        desclab: ['', Validators.required],
        location: [this.areaLocality],
        city: [this.city, Validators.required],
        state: [this.state, Validators.required],
        country: [this.country, Validators.required],
        zipcode: [this.pinCode, Validators.required],
      }),
      step3: this.fb.group({
        nameContactPerson: ['', Validators.required],
        url: [''],
        email: ['', [Validators.required, Validators.email]],
        phoneNumbers: this.fb.array([this.fb.control('')]),
      }),
      step4: this.fb.group({
        authlab: ['', Validators.required],
        accreditationValidUpto: [''],
        accreditationCertificate: [null],
        recaptcha: [null, Validators.required],
      }),
    });
  }

  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {});
  }

  public addTokenLog(message: string, token: any) {
    console.log(`${message}:`, token);
    this.tempToken = token;
    const step4Group = this.getStepFormGroup(4);
    step4Group.patchValue({
      recaptcha: this.tempToken,
    });
  }

  ngOnInit(): void {}

  //lab user reg form

  openRegForm(a: any) {
    this.labReg = true;
  }
  onLabUserSubmit() {}
  //lab user reg form

  //step wise Lab reg form..

  getStepFormGroup(step: number): FormGroup {
    return this.labRegForm.get(`step${step}`) as FormGroup;
  }

  get phoneNumbers(): FormArray {
    return this.getStepFormGroup(3).get('phoneNumbers') as FormArray;
  }

  saveStep(step: number) {
    if (this.getStepFormGroup(step).valid) {
      this.currentStep = step + 1;
      if (step === 1) {
        this.populateStep2Values();
      }
    }
  }

  previousStep() {
    this.currentStep--;
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this.fb.control(''));
  }

  onFileSelected(event: any, fieldName: string) {
    if (event.target.files.length > 0) {
      this.fileData[fieldName] = event.target.files[0];
    }
  }

  populateStep2Values() {
    // Populate Step 2 values when this step is shown
    const step2Group = this.getStepFormGroup(2);
    step2Group.patchValue({
      location: this.areaLocality,
      city: this.city,
      state: this.state,
      country: this.country,
      zipcode: this.pinCode,
    });
  }

  submitForm() {
    if (this.labRegForm.valid) {
      console.log('Form submitted:', this.labRegForm.value);
    } else {
      console.log('Form submitted:', this.labRegForm.value);
    }
  }
  //step wise form..
}
