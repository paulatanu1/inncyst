import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { throwIfEmpty } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss']
})
export class InternshipsComponent implements OnInit {
  profileUpdate:boolean = false;
  items: MenuItem[]=[]
  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Step 1', routerLink:'skills'},
      {label: 'Step 2', routerLink:'uploadresume'}
  ];
  }

  applyJob(){
    this.profileUpdate = true;
    this.router.navigate(['jobs/internships/skills']);
    console.log(this.router)
  }

  closeProfileUpdateForm(){
    this.profileUpdate = false;
  }

 

}
