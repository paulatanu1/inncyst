import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentTheme: string | null = '';
  userRole!: string;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

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
