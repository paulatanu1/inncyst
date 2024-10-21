import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrationAgreeDialogComponent } from '../../../app/share/registration-agree-dialog/registration-agree-dialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { RegistrationService } from 'src/app/registration-service/registration.service';
import { OtpVerificationService } from '../registration-otp/otp-verification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-tab',
  templateUrl: './registration-tab.component.html',
  styleUrls: ['./registration-tab.component.scss'],
})
export class RegistrationTabComponent implements OnInit {
  registrationForm!: FormGroup;
  registrationFormCollege!: FormGroup;
  registrationFormCompany!: FormGroup;
  registrationFormMentor!: FormGroup;
  activeTabName = 'candidate';
  @Output() currentTabInfo = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private reg: RegistrationService,
    private otpService: OtpVerificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.initForms();
    this.initCandidateForm();
    this.currentTabInfo.emit(this.activeTabName);
  }

  // initForms() {
  //   this.registrationForm = this.fb.group({
  //     userName: ['', [Validators.required, Validators.minLength(3)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     mobile: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: [
  //       '',
  //       [Validators.required, this.matchPassword('password')],
  //     ],
  //     agree: [false, [Validators.requiredTrue]],
  //   });

  //   this.registrationFormCollege = this.fb.group({
  //     collegeName: ['', [Validators.required]],
  //     collegeEmail: ['', [Validators.required, Validators.email]],
  //     collegePhone: [null, [Validators.required, Validators.email]],

  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: [
  //       '',
  //       [Validators.required, this.matchPassword('password')],
  //     ],
  //     agree: [false, [Validators.requiredTrue]],
  //   });

  //   this.registrationFormCompany = this.fb.group({
  //     organizationName: ['', [Validators.required]],
  //     organizationEmail: ['', [Validators.required, Validators.email]],
  //     organizationPhone: [
  //       '',
  //       [Validators.required, Validators.pattern('^[0-9]{10}$')],
  //     ],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: [
  //       '',
  //       [Validators.required, this.matchPassword('password')],
  //     ],
  //     agree: [false, [Validators.requiredTrue]],
  //   });

  //   this.registrationFormMentor = this.fb.group({
  //     mentorName: ['', [Validators.required]],
  //     mentorEmail: ['', [Validators.required, Validators.email]],
  //     mentorPhone: [
  //       '',
  //       [Validators.required, Validators.pattern('^[0-9]{10}$')],
  //     ],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: [
  //       '',
  //       [Validators.required, this.matchPassword('password')],
  //     ],
  //     agree: [false, [Validators.requiredTrue]],
  //   });
  // }

  onTabChange(event: MatTabChangeEvent) {
    this.activeTabName = event.tab.textLabel.toLowerCase();
    this.currentTabInfo.emit(this.activeTabName);
    this.resetForms();

    // Initialize form based on the selected tab
    switch (event.index) {
      case 0:
        this.initCandidateForm();
        break;
      case 1:
        this.initCollegeForm();
        break;
      case 2:
        this.initCompanyForm();
        break;
      case 3:
        this.initMentorForm();
        break;
    }
  }

  // Reset all forms
  resetForms() {
    if (this.registrationForm) {
      this.registrationForm.reset();
    }

    if (this.registrationFormCollege) {
      this.registrationFormCollege.reset();
    }

    if (this.registrationFormCompany) {
      this.registrationFormCompany.reset();
    }

    if (this.registrationFormMentor) {
      this.registrationFormMentor.reset();
    }
  }

  // Initialize each form individually
  initCandidateForm() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [Validators.required, this.matchPassword('password')],
      ],
      agree: [false, [Validators.requiredTrue]],
    });
  }

  initCollegeForm() {
    this.registrationFormCollege = this.fb.group({
      collegeName: ['', [Validators.required]],
      collegeEmail: ['', [Validators.required, Validators.email]],
      collegePhone: [
        null,
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [Validators.required, this.matchPassword('password')],
      ],
      agree: [false, [Validators.requiredTrue]],
    });
  }

  initCompanyForm() {
    this.registrationFormCompany = this.fb.group({
      organizationName: ['', [Validators.required]],
      organizationEmail: ['', [Validators.required, Validators.email]],
      organizationPhone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [Validators.required, this.matchPassword('password')],
      ],
      agree: [false, [Validators.requiredTrue]],
    });
  }

  initMentorForm() {
    this.registrationFormMentor = this.fb.group({
      mentorName: ['', [Validators.required]],
      mentorEmail: ['', [Validators.required, Validators.email]],
      mentorPhone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [Validators.required, this.matchPassword('password')],
      ],
      agree: [false, [Validators.requiredTrue]],
    });
  }

  //term and condition open and close logic
  openDialog(form: FormGroup): void {
    const dialogRef = this.dialog.open(RegistrationAgreeDialogComponent, {
      width: '600px',
      height: '600px',
      panelClass: 'custom-dialog-container',
      data: { checked: form.get('agree')?.value },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result !== undefined) {
        console.log(result);
        form.patchValue({ agree: result });
      }
    });
  }

  matchPassword(passwordKey: string) {
    return (control: any) => {
      if (control.parent) {
        const password = control.parent.get(passwordKey);
        return password && control.value === password.value
          ? null
          : { mismatch: true };
      }
      return null;
    };
  }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!control?.invalid && (control?.dirty || control?.touched);
  }

  onSubmit(form: FormGroup) {
    console.log(form.value, this.activeTabName);
    if (form.invalid) {
      console.log(form.value);
      form.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
    }

    // Extract the common form data fields
    const formData = form.value;

    // Set up the user name, email, phone, and password based on the role
    let userName = '',
      userEmail = '',
      userPhone = '',
      password = '';
    switch (this.activeTabName) {
      case 'candidate':
        userName = formData.userName;
        userEmail = formData.email;
        userPhone = formData.mobile;
        password = formData.password;
        break;
      case 'college':
        userName = formData.collegeName;
        userEmail = formData.collegeEmail;
        userPhone = formData.collegePhone;
        password = formData.password;
        break;
      case 'company':
        userName = formData.organizationName;
        userEmail = formData.organizationEmail;
        userPhone = formData.organizationPhone;
        password = formData.password;
        break;
      case 'mentor':
        userName = formData.mentorName;
        userEmail = formData.mentorEmail;
        userPhone = formData.mentorPhone;
        password = formData.password;
        break;
      default:
        console.error('Unknown role');
        return;
    }
    this.reg
      .sendRegistrationRequest(
        userName,
        userEmail,
        userPhone,
        password,
        this.activeTabName
      )
      .subscribe({
        next: (response) => {
          console.log('Registration Success', response);
          this.reg.loginResponse.next(response);
          this.router.navigate(['/otp-verification']);
        },
        error: (error) => {
          console.error('Registration Error:', error);
        },
      });
  }
}
