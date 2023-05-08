import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-otp',
  templateUrl: './registration-otp.component.html',
  styleUrls: ['./registration-otp.component.scss']
})
export class RegistrationOtpComponent implements OnInit {
  isOtp:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
