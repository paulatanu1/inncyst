import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-apply-section',
  templateUrl: './apply-section.component.html',
  styleUrls: ['./apply-section.component.scss'],
})
export class ApplySectionComponent implements OnInit {
  isRegisterModal: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openModal() {
    // if (ls.get('login_token')) {
    //   this.router.navigateByUrl('/jobs/posts');
    // } else {
    //   this.router.navigateByUrl('/registration');
    // }
    // this.isRegisterModal = true;

    this.router.navigateByUrl('/internships');

  }

  onhideModal() {
    this.isRegisterModal = false;
  }
}
