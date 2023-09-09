import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { throwIfEmpty } from 'rxjs';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';
import { HttpClient } from '@angular/common/http';
import { LoginDetailsService } from 'src/app/common-service/login-details.service';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss'],
  providers: [MessageService]
})
export class InternshipsComponent implements OnInit {
  profileUpdate:boolean = false;
  items: MenuItem[]=[];
  activeIndex: number = 0;
  constructor(private loginDetails:LoginDetailsService ,private router: Router,private messageService: MessageService,private jobService:JobsService) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Skill', routerLink:'skills',
      command: (event: any) => {
        this.activeIndex = 0;
        // this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
    }},
      {label: 'Info', routerLink:'uploadresume',
      command: (event: any) => {
        this.activeIndex = 1;
        // this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
    }}
  ];

// this.jobService.getAllJobDetails().subscribe((res=>{
// console.log(res,'res')
// }),(err=>{
//   console.log(err,'err')
// }))
alert('hhhhi')
// this.loginDetails.a.next((res=>{
//   alert('dddd')
// }))

this.loginDetails.loginDetails.subscribe({
  next:(res)=>{
    console.log(res,'res')
  }
})

  }
  applyJob(){

    // this.loginDetails.a.next('kkk')

    this.profileUpdate = true;
    this.router.navigate(['jobs/internships/skills']);
  }

  closeProfileUpdateForm(){
    this.profileUpdate = false;
  }

 

}
