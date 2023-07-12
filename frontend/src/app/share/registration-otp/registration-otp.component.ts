import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { OtpVerificationService } from './otp-verification.service';

import ls from 'localstorage-slim'
import { HeaderService } from '../module-service/header.service';
interface Iotpset{
  email:number | null;
  phone:number | null
}
@Component({
  selector: 'app-registration-otp',
  templateUrl: './registration-otp.component.html',
  styleUrls: ['./registration-otp.component.scss']
})
export class RegistrationOtpComponent implements OnInit {
  @ViewChild('ngOtpInput1') ngOtpInput1: any;
  @ViewChild('ngOtpInput2') ngOtpInput2: any;
  @Output() OtpModal = new EventEmitter();
  @Input() isOtpPage: boolean = false;
  verifyRegistration!:FormGroup;
  otpSet:Iotpset={
    email: null,
    phone: null
  }
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  isOtp:boolean = true;
  visible:boolean = true;
  userEmails:string | null= '';
  userMobileNumber:string | null = ''
  constructor(private fb:FormBuilder,private otpVerifivation:OtpVerificationService,private _header:HeaderService) {
    this.verifyRegistration = this.fb.group({
      emailOtp:[null,[Validators.required]],
      phoneOtp:[null,[Validators.required]]
    })
  }

  ngAfterViewInit(){
    // this.isOtp = false;
  }

  ngOnInit(): void {
    this.userEmails = ls.get('userEmail')
    this.userMobileNumber = ls.get('phone')
    // setTimeout(() => {
    //   this.isOtp = this.isOtpPage;
    // }, 500);
  }
  ngOnChanges(){
  }
  

  onHide(){
    this.isOtp = false;
    this.OtpModal.emit(false)
  }

  onPhoneOtpChange(event:string){
    console.log(event , 'onPhoneOtpChange')
  }

  onEmailOtpChange(event:string){
    console.log(event , 'onemailOtpChange')
  }

  onSubmitOtp(){
    // debugger;
    // if(this.verifyRegistration.valid){
      this.otpSet = {
        // email:this.verifyRegistration?.get('emailOtp')?.value,
        // phone:this.verifyRegistration?.get('phoneOtp')?.value
        email:null,
        phone:null
      }
      console.log(this.otpSet)
      this.otpVerifivation.otpSubmit(this.otpSet).subscribe({
        next: (res)=>{
          console.log(res,'otp response')
          this.OtpModal.emit(false);
          this._header.userLoggedin.next(true)
          ls.set('logged',true)
        },
        error: (err)=>{
          console.log(err,'otp response')
        }
      })
    // }
  }

}
