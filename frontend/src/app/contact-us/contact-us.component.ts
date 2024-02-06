import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from './contact-service/contact-us.service';
import { ToastServiceService } from '../service/toast-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private submitData: ContactUsService,
    private _toast: ToastServiceService
  ) {
    this.contactUsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          phoneNumberValidator,
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      message: [''],
    });
  }

  ngOnInit(): void {}

  onSubmitContactForm() {
    if (this.contactUsForm.valid) {
      this.submitData.submitContactForm(this.contactUsForm.value).subscribe({
        next: (res) => {
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.message,
          });
          this.contactUsForm.reset();
        },
        error: (err) => {
          this._toast.showToaster.next({
            severity: 'error',
            summary: 'error',
            detail: err.error.message,
          });
        },
      });
    } else {
      this._toast.showToaster.next({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please Fillup Details',
      });
    }
  }
}

function phoneNumberValidator(control: { value: string }) {
  const phoneNumber = control.value;
  if (phoneNumber && phoneNumber.length > 10) {
    return { phoneNumberLength: true };
  }
  return null;
}
