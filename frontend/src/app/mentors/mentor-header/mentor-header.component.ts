import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';
import { SocialAuthService } from 'src/app/service/social-auth.service';
@Component({
  selector: 'app-mentor-header',
  templateUrl: './mentor-header.component.html',
  styleUrls: ['./mentor-header.component.scss'],
})
export class MentorHeaderComponent implements OnInit {
  isMenuVisible = false; // Property to control menu visibility
  url = '';
  constructor(private socialAuth: SocialAuthService, private router: Router) {
    this.url = this.router.url;
    console.log(this.url);
  }

  ngOnInit(): void {}

  // Method to show the menu
  showMenu(): void {
    this.isMenuVisible = true;
  }

  // Method to hide the menu
  hideMenu(): void {
    this.isMenuVisible = false;
  }

  logOutUser() {
    ls.clear();
    ls.remove('logoutSuccess');
    this.socialAuth.logout();
  }
}
