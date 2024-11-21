import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  message = encodeURIComponent('Hello Support Team,I want help regarding - ');
  whatsappURL: string = '';
  currentYear: Number;
  constructor() {
    const year = new Date();
    this.currentYear = year.getFullYear();
  }

  ngOnInit(): void {}

  whatsappConnect() {
    const message = encodeURIComponent(
      'Hello Support Team,I want help regarding - '
    );
    const whatsappURL = `https://api.whatsapp.com/send?phone=${environment.WHATSAPP_NUMBER}&text= ${message}`;
    window.open(whatsappURL, '_blank');
  }
}
