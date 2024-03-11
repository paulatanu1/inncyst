import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-get-job',
  templateUrl: './get-job.component.html',
  styleUrls: ['./get-job.component.scss']
})
export class GetJobComponent implements OnInit {
  isRegisterModal:boolean = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  openModal(){
    // this.isRegisterModal = true;
    if (ls.get('login_token') ) {
      this.router.navigateByUrl('/jobs/posts');
    } else if (!ls.get('login_token') ) {

      this.router.navigateByUrl('/registeration');
    }
  }
  
  onhideModal(){
    this.isRegisterModal = false;
  }
}
