import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  
} from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/common-service/passwordValidators';

@Component({
  selector: 'app-registration-tab',
  templateUrl: './registration-tab.component.html',
  styleUrls: ['./registration-tab.component.scss']
})
export class RegistrationTabComponent implements OnInit {


  registrationForm!: FormGroup;
  registrationFormCollege!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        mobile: [
          null,
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        options: ['student', [Validators.required]],
        agree: [false, [Validators.required, Validators.requiredTrue]],
      },
      {
        validators: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

}
