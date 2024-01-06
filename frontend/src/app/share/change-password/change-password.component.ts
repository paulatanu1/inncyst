import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'src/app/common-service/passwordValidators';
import { LoginApiService } from '../login/login-api.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { Router } from '@angular/router';
import { LeftMenuHandelService } from 'src/app/industry/left-menu-handel.service';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  isSubmited: boolean = false;
  constructor(
    private fb: FormBuilder,
    private loginApi: LoginApiService,
    private _toast: ToastServiceService,
    private router: Router,
    private _menuHandel:LeftMenuHandelService  ) {}

  ngOnInit(): void {
    this._menuHandel.leftMenuActive.next(5)
    this.changePasswordForm = this.fb.group(
      {
        oldPassword: [null, [Validators.required, Validators.minLength(6)]],
        NewPassword: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.checkPasswords,
      }
    );
  }
  checkPasswords(group: FormGroup) {
    let pass = group.get('NewPassword')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return pass === confirmPassword ? null : { notSame: true };
  }
  onChangePasswordSubmit() {

    if (this.changePasswordForm.valid) {
      this.loginApi.changePassword(this.changePasswordForm?.value).subscribe({
        next: (res) => {
          this._toast.showToaster.next({
            severity: 'success',
            summary: 'success',
            detail: res.message,
          });
       console.log()
       if(ls.get('role') == 'industry'){
        this.router.navigate(['/industry/jobs']);
       }else{

         this.router.navigate(['/jobs/posts']);
       }
        },
        error: (err) => {
          this._toast.showToaster.next({
            severity: 'error',
            summary: 'error',
            detail: err.error.message,
          });
        },
      });
    }
  }
}
