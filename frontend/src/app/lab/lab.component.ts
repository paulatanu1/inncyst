import { Component, OnInit } from '@angular/core';
import { Menu } from './menu-model/menu.model';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
})
export class LabComponent implements OnInit {
  opened = true;
  constructor() {}
  toggle(): void {
    this.opened = !this.opened;
  }

  menu: Menu = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      link: 'lab',
      color: '#ff7f0e',
    },
    {
      title: 'Faciliies',
      icon: 'workspaces',
      color: '#ff7f0e',
      link: 'facilites',
    },
  ];
  ngOnInit(): void {}
}
