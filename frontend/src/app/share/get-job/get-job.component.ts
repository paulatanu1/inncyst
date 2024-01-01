import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-job',
  templateUrl: './get-job.component.html',
  styleUrls: ['./get-job.component.scss']
})
export class GetJobComponent implements OnInit {
  isRegisterModal:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openModal(){
    console.log('click')
    this.isRegisterModal = true;
  }
  
  onhideModal(){
    this.isRegisterModal = false;
  }
}
