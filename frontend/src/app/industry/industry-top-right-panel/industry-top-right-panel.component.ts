import { Component, OnInit, Renderer2 } from '@angular/core';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-industry-top-right-panel',
  templateUrl: './industry-top-right-panel.component.html',
  styleUrls: ['./industry-top-right-panel.component.scss']
})
export class IndustryTopRightPanelComponent implements OnInit {
  currentTheme: string | null = '';
  userRole!:string
  constructor(private renderer: Renderer2) { 
this.userRole=<string>ls.get('role')
console.log(this.userRole)
  }

  ngOnInit(): void {

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
