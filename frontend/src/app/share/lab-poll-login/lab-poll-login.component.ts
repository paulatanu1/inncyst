import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab-poll-login',
  templateUrl: './lab-poll-login.component.html',
  styleUrls: ['./lab-poll-login.component.scss'],
})
export class LabPollLoginComponent implements OnInit {
  labUserReg: boolean = false;
  labReg: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  openRegForm(formView: string) {}
}
