import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-industry-dashboard',
  templateUrl: './industry-dashboard.component.html',
  styleUrls: ['./industry-dashboard.component.scss']
})
export class IndustryDashboardComponent implements OnInit {
  // toggleSwitch: any;
  currentTheme: string | null = '';
  // mainHeader: any;
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.currentTheme = localStorage.getItem('theme');
    if (this.currentTheme === 'dark') {
      this.enableDarkTheme();
    }
  }

  switchTheme(event: any) {
    if (event.target.checked) {
      this.enableDarkTheme();
      localStorage.setItem('theme', 'dark');
    } else {
      this.enableLightTheme();
      localStorage.setItem('theme', 'light');
    }
  }

  enableDarkTheme() {
    this.renderer.addClass(document.body, 'dark-mode');
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
      this.renderer.addClass(mainHeader, 'navbar-dark');
      this.renderer.removeClass(mainHeader, 'navbar-light');
    }
  }

  enableLightTheme() {
    this.renderer.removeClass(document.body, 'dark-mode');
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
      this.renderer.addClass(mainHeader, 'navbar-light');
      this.renderer.removeClass(mainHeader, 'navbar-dark');
    }
  }

}
