import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { OtpVerificationService } from './otp-verification.service';

import ls from 'localstorage-slim'
import { HeaderService } from '../module-service/header.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
interface Iotpset{
  email:string ;
  phone:string ;
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
    email: '',
    phone: ''
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
  isphoneOtp:string = '';
  isemailOtp:string = '';

  constructor(private fb:FormBuilder,private otpVerifivation:OtpVerificationService,private _header:HeaderService,private _toast:ToastServiceService) {
    this.verifyRegistration = this.fb.group({
      emailOtp:['',[Validators.required]],
      phoneOtp:['',[Validators.required]]
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
    this.isphoneOtp= event
  }

  onEmailOtpChange(event:string){
    console.log(event , 'onemailOtpChange')
    this.isemailOtp = event
  }

  onSubmitOtp(){
    // debugger;
    console.log('click')
    // if(this.verifyRegistration.valid){
      this.otpSet = {
        email:this.isemailOtp,
        phone:this.isphoneOtp
      }
      console.log(this.otpSet)
      this.otpVerifivation.otpSubmit(this.otpSet).subscribe({
        next: (res)=>{
          console.log(res,'otp response')
          this.OtpModal.emit(false);
          this._header.userLoggedin.next(true)
          ls.set('logged',true)
          this._toast.showToaster.next({severity:'success',summary:'success',detail:res.message});
          //set route logic for user 
        },
        error: (err)=>{
          console.log(err,'otp response')
        }
      })
    // }
  }

}
