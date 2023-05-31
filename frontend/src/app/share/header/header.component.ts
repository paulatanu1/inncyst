import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import {ConfirmPasswordValidator } from 'src/app/common-service/passwordValidators';
import { RegistrationService } from 'src/app/registration-service/registration.service';
import { ProgressBarService } from 'src/app/service/progress-bar.service';

interface options {
  name: string,
  code: string
}

interface IregistrationOption{
  option:string,
  id:number
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[MessageService]
})

export class HeaderComponent implements OnInit {
  items: MenuItem[];
  dropdownitems:MenuItem[];
  registration:boolean =false;
  isStudent:boolean = false;
  isEmployer:boolean = false;
  index:number = 0;
  value1:string = '';
  options: options[];
  isSignup:boolean = false;
  submitted:boolean = false
  registerForm!: FormGroup;
  sidebarEnable:boolean = false;
  loginflow:boolean = false;
  isOtpPage:boolean = false;
  // registerForm:FormGroup | undefined;
  registrationOption:IregistrationOption[]=[];
  isSubmited:boolean = false
  //Outputs
  constructor(private messageService: MessageService,private fb: FormBuilder,private reg:RegistrationService,private progress:ProgressBarService) {
    this.items = [
      {label: 'As a Student', command: () => {
          this.login('student');
      }},
      {label: 'As a Employer', command: () => {
        this.login('employer');
    }}
    ];
    this.dropdownitems = [
      {label:'Internship'},
      {label:'Job'},
      {label:'Project Enabler'}
    ]

    this.options = [
      // {name: 'Select the option', code: '0'},
      {name: 'Intern', code: '1'},
      {name: 'Job', code: '2'},
      {name: 'Student', code: '3'},
      {name: 'Industry', code: '3'}
  ];

  this.registrationOption = 
  [{
    option:'student',id:1
  },
  {
    option:'intern',id:1
  },
  {
    option:'job',id:1
  }]
   }

  ngOnInit(): void {
    console.log(this.registrationOption)
    this.registerForm =this.fb.group({
      name: ['',[Validators.required,Validators.minLength(4)]],
      email: ['',[Validators.required,Validators.email]],
      mobile:[null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password:['',[Validators.required],Validators.minLength(6)],
      confirmPassword:['',[Validators.required]],
      options:['Select the option',[Validators.required]],
      agree:[false,[Validators.required,Validators.requiredTrue]],
    },{
      validators:ConfirmPasswordValidator("password", "confirmPassword")
    });
  }

  optionClick(){
    this.progress.setProgressBar(false);
  }

  onSubmit(){
    console.log(this.registerForm);
    this.isSubmited = true
    if(this.isSubmited && this.registerForm.valid){
      this.isSignup = true;
      this.registration = false;
      this.sidebarEnable = true;
    }
    
    this.reg.sendRegistrationRequest().subscribe((response)=>{
      console.log(response , 'response')
    })
  

    this.messageService.add({
      key: "main",
      severity: "info",
      detail: "Ready to scan",
    });
  }

  login(type:string){
    console.log(type)
    if(type === 'student'){
      this.registration = true;
      this.isStudent = true;
    }else{
      this.registration = true;
      this.isEmployer = true;
    }

  }

  register(){
    this.registration = true;
  }

  getLoginForm(){
    this.loginflow = true
  }

  quistionSubmit(event:boolean){
    this.isOtpPage = event;
    this.isSignup = false;
  }

  OtpModal(event:boolean){
    // console.log(event)
    this.isOtpPage = event;
  }

  registrationLoginOption(){
  this.registration = false;
  this.loginflow = true;
  }

  openRegisterFlow(event:boolean){
    this.registration = event;
    this.loginflow = false;
  }
}




// function MustMatch(controlName: string, matchingControlName: string) {
//   return (group: AbstractControl) => {
//     const control = group.get(controlName);
//     const matchingControl = group.get(matchingControlName);

//     if (!control || !matchingControl) {
//         return null;
//     }

//     // return if another validator has already found an error on the matchingControl
//     if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
//         return null;
//     }

//     // set error on matchingControl if validation fails
//     if (control.value !== matchingControl.value) {
//         matchingControl.setErrors({ mustMatch: true });
//     } else {
//         matchingControl.setErrors(null);
//     }
//     return null;
// }
// }

