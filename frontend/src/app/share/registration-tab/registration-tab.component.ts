import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrationAgreeDialogComponent } from '../../../app/share/registration-agree-dialog/registration-agree-dialog.component';

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

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
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

    this.registrationFormCollege = this.fb.group({
      collegeName: ['', [Validators.required]],
      collegeEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [Validators.required, this.matchPassword('password')],
      ],
      agree: [false, [Validators.requiredTrue]],
    });

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
    if (form.invalid) {
      // Mark all fields as touched to show validation errors
      form.markAllAsTouched();
      console.log('Form is invalid', form.value);
      return;
    }

    // If form is valid, process the form data
    const formData = form.value;
    console.log('Form Submitted Successfully:', formData);
  }
}
