import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';

interface options {
  name: string,
  code: string
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
  constructor(private messageService: MessageService,private fb: FormBuilder) {
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
      {name: 'Select the option', code: '0'}
  ];

   }

 

  ngOnInit(): void {
    this.registerForm =this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      mobile:[null,[Validators.required]],
      password:['',[Validators.required],Validators.minLength(6)],
      confirmPassword:['',[Validators.required]],
      options:['',[Validators.required]],
      agree:[false,[Validators.required,Validators.requiredTrue]],
    },{
      // validators: MustMatch('password', 'confirmPassword')
    });
  // this.activeItem = this.registrationType[0];
  }

  onSubmit(){
    console.log(this.registerForm);
    this.isSignup = true;
    this.registration = false;
    this.sidebarEnable = true
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

