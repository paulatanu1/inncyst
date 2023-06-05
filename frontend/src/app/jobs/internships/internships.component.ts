import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss']
})
export class InternshipsComponent implements OnInit {
  profileUpdate:boolean = false;
  items: MenuItem[]=[]
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Step 1'},
      {label: 'Step 2'},
      {label: 'Step 3'}
  ];
  }

  applyJob(){
    this.profileUpdate = true;
  }

  closeProfileUpdateForm(){
    this.profileUpdate = false;
  }

}
