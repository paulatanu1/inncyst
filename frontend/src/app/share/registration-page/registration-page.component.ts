import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmPasswordValidator } from 'src/app/common-service/passwordValidators';
import { RegistrationService } from 'src/app/registration-service/registration.service';
import { ProgressBarService } from 'src/app/service/progress-bar.service';
import ls from 'localstorage-slim'
import { LoginEnablerService } from 'src/app/service/login-enabler.service';
import { QuestionSetEnablerService } from 'src/app/service/question-set-enabler.service';
interface options {
  optionName: string,
  code: string
}

interface IregistrationOption{
  option:string,
  id:number
}

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  providers:[MessageService]
})
export class RegistrationPageComponent implements OnInit {
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
  progressBar:boolean = false;
  registerId:string = ''
  constructor(private messageService: MessageService,private fb: FormBuilder,private reg:RegistrationService,private progress:ProgressBarService,private router:Router,private route: ActivatedRoute,private login:LoginEnablerService,private question:QuestionSetEnablerService) {
    

    this.options = [
      // {name: 'Select the option', code: '0'},
      {optionName: 'Intern', code: '1'},
      {optionName: 'Job', code: '2'},
      {optionName: 'Student', code: '3'},
      {optionName: 'Industry', code: '3'}
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
    this.registerForm =this.fb.group({
      userName: ['',[Validators.required,Validators.minLength(4)]],
      email: ['',[Validators.required,Validators.email]],
      mobile:[null,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required]],
      options:['Select the option',[Validators.required]],
      agree:[false,[Validators.required,Validators.requiredTrue]],
    },{
      validators:ConfirmPasswordValidator("password", "confirmPassword")
    });

    //
    this.progress.isProgressBarShow.subscribe({
      next:(res:boolean)=>{
        this.progressBar = res;
      }
    })
  }

  optionClick(url:string){
    // this.progressBar = true;
    this.progress.isProgressBarShow.next(true)
    if(url === 'jobs'){
      this.router.navigateByUrl('/jobs');
      this.progress.isProgressBarShow.next(false)
    }else if(url === 'home'){
      this.router.navigateByUrl('/home');
      this.progress.isProgressBarShow.next(false)
    }else if(url === 'about-us'){
      this.router.navigateByUrl('/about-us');
      this.progress.isProgressBarShow.next(false)
    }else if(url === 'contactus'){
      this.router.navigateByUrl('/contactus');
      this.progress.isProgressBarShow.next(false)
    }
  }



  onSubmit(){
    this.isSubmited = true
    if(this.isSubmited && this.registerForm.valid){
      this.registration = false;
      let userName:string = this.registerForm.get('userName')?.value;
      let userEmail:string = this.registerForm.get('email')?.value;
      let phone:string = this.registerForm.get('mobile')?.value;
      let password:string = this.registerForm.get('confirmPassword')?.value;
      let userRole:string = this.registerForm.get('options')?.value;
      // console.log(userName)
      this.reg.sendRegistrationRequest(userName,userEmail,phone,password,userRole).subscribe((response)=>{
        console.log(response , 'response');
        this.registerId = response.data._id
        this.question.isQuestionSetEnable.next(true);
        ls.set('registerId',this.registerId)
        this.isSignup = true;
        this.sidebarEnable = true;
        this.registerForm.reset();
      })
    }


}
  registrationLoginOption(){
  this.registration = false;
  this.loginflow = true;
  }

  redirectToLogin(){
    this.login.loginEnable.next(true);
  }
  

  //   this.messageService.add({
  //     key: "main",
  //     severity: "info",
  //     detail: "Ready to scan",
  //   });
  // }

  // setQueryParams(page:string){
  //   const urlTree = this.router.createUrlTree([], {
  //     queryParams: { users: page },
  //     queryParamsHandling: "merge",
  //     preserveFragment: true });
  //     this.router.navigateByUrl(urlTree); 
  // }

  // resetQueryParams(){
  //   this.router.navigate([], {
  //     queryParams: {
  //       'users': null,
  //       'youCanRemoveMultiple': null,
  //     },
  //     queryParamsHandling: 'merge'
  //   })
  // }

  // register(){
  //   this.setQueryParams('register')
  //   this.registration = true;
  // }

  // quistionSubmit(event:boolean){
  //   this.isOtpPage = event;
  //   this.isSignup = false;
  // }

  // OtpModal(event:boolean){
  //   this.isOtpPage = event;
  // }



  // openRegisterFlow(event:boolean){
  //   this.registration = event;
  //   this.loginflow = false;
  // }

}
