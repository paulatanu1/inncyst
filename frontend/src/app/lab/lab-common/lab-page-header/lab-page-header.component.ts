import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab-page-header',
  templateUrl: './lab-page-header.component.html',
  styleUrls: ['./lab-page-header.component.scss'],
})
export class LabPageHeaderComponent implements OnInit {
  @Input() icon?: string;
  constructor() {}

  ngOnInit(): void {}
}
