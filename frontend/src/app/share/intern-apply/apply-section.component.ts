import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-section',
  templateUrl: './apply-section.component.html',
  styleUrls: ['./apply-section.component.scss']
})
export class ApplySectionComponent implements OnInit {
  isRegisterModal:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }


  openModal(){
    this.isRegisterModal = true;
  }
  onhideModal(){
    this.isRegisterModal = false;
  }
}
