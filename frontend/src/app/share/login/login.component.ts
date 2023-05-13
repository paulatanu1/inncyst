import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface options {
  name: string,
  code: string
}

interface IloginOptionType{
  title:string;
  code:number
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  options: options[];
  loginForm!: FormGroup;
  loginOptionType:IloginOptionType[]

  //Output
  @Output() openRegisterFlow = new EventEmitter()

  constructor(private fb: FormBuilder) {
    this.options = [
      {name: 'Select the option', code: '0'}
  ];

  this.loginOptionType = 
    [{title:'Select the option',code:0},
    {title:'Intern',code:1},
    {title:'Job',code:2},
    {title:'Student',code:3},
    {title:'Industry',code:4}]

    }

  ngOnInit(): void {
    this.loginForm =this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required],Validators.minLength(6)],
      options:['Select the option',[Validators.required]],
    },{
      // validators: MustMatch('password', 'confirmPassword')
    });
  }

  onLoginSubmit(){

  }

  loginPanelOpen(){
    this.openRegisterFlow.emit(true);
  }

}
