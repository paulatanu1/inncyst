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
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        null,
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      options: ['student', [Validators.required]],
      agree: [false, [Validators.required, Validators.requiredTrue]],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationAgreeDialogComponent, {
      width: '600px',
      height: '600px',
      panelClass: 'custom-dialog-container',
      data: { checked: this.registrationForm.get('agree')?.value },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result !== undefined) {
        console.log(result);
        this.registrationForm.patchValue({ agree: result });
      }
    });
  }
}
