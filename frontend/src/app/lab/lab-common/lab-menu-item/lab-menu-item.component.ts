import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '../../menu-model/menu.model';

@Component({
  selector: 'app-lab-menu-item',
  templateUrl: './lab-menu-item.component.html',
  styleUrls: ['./lab-menu-item.component.scss'],
})
export class LabMenuItemComponent implements OnInit {
  @Input() menu: Menu = [];
  constructor() {}

  ngOnInit(): void {}
}
