import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgOtpInputComponent } from 'ng-otp-input';

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
  isOtp:boolean = false;
  visible:boolean = true;
  constructor() {
    // this.isOtp = true;
   }

  // ngDoCheck(): void{
  //   this.isOtp = true;
  // }

  ngAfterViewInit(){
    // this.isOtp = false;
  }

  ngOnInit(): void {
    // console.log(this.isOtpPage)

    setTimeout(() => {
      this.isOtp = this.isOtpPage;
    }, 500);
   
    // console.log(this.isOtp)
    // this.isOtp = true;
  }
  ngOnChanges(){
    // this.isOtp = true;
    // this.isOtp = this.isOtpPage;
    // console.log(this.isOtp)
  }
  

  onHide(){
    this.isOtp = false;
    this.OtpModal.emit(false)
  }

}
