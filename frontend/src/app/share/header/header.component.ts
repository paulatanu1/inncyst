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
  dropdownitems:MenuItem[]
  constructor(private messageService: MessageService) {
    this.items = [
      {label: 'As a Student', icon: 'pi pi-refresh', command: () => {
          this.update();
      }},
      {label: 'As a Employer', icon: 'pi pi-refresh', command: () => {
        this.update();
    }}
    ];
    this.dropdownitems = [
      {label:'Internship'},
      {label:'Job'},
      {label:'Project Enabler'}
    ]
   }

  ngOnInit(): void {
  }


  update(){

  }

  register(){
    
  }
}
