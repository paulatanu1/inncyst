import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginApiService } from 'src/app/share/login/login-api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginApiService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      options: ['Admin'],
    });
  }

  onLoginSubmit() {
    // debugger;
    console.log(this.loginForm.valid, this.loginForm.value);
    if (this.loginForm.valid) {
      let userEmail = this.loginForm.get('email')?.value;
      let password = this.loginForm.get('password')?.value;

      this.loginService.login(userEmail, password).subscribe({
        next: (res) => {
          console.log(res, 'ress');
          if (res.LOGIN_TYPE === 'admin') {
            this._router.navigate(['admin']);
          }
        },
      });
    }
  }
}
