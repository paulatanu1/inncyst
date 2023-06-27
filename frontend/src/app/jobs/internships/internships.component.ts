import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { throwIfEmpty } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss'],
  // providers: [MessageService]
})
export class InternshipsComponent implements OnInit {
  profileUpdate:boolean = false;
  items: MenuItem[]=[];
  activeIndex: number = 0;
  constructor(private router: Router,private messageService: MessageService) { }

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
  }

  applyJob(){
    this.profileUpdate = true;
    this.router.navigate(['jobs/internships/skills']);
  }

  closeProfileUpdateForm(){
    this.profileUpdate = false;
  }

 

}
