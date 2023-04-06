import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

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
  value1:string = ''
  constructor(private messageService: MessageService) {
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
   }

  ngOnInit(): void {
    
  
  // this.activeItem = this.registrationType[0];
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
    
  }
}
