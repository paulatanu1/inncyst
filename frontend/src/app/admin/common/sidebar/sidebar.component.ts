import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebarMenu: sideMenuAdmin[] = [
    {
      menuName: 'Dashboard',
      selfIndex: 0,
      route: 'dashboard',
    },
    {
      menuName: 'Plans Management',
      selfIndex: 1,
      route: 'plans-management',
    },
    {
      menuName: 'Subscription',
      selfIndex: 2,
      route: 'subscriptions',
    },
    {
      menuName: 'client portal content',
      selfIndex: 3,
      route: 'client-portal-contant-manage',
    },
    {
      menuName: 'Employer Management',
      selfIndex: 4,
      route: 'employer-management',
    },
    {
      menuName: 'Student Management',
      selfIndex: 5,
      route: 'student-management',
    },
    {
      menuName: 'ACL-Manage',
      selfIndex: 6,
      route: 'acl-manage',
    },
  ];
  activeMenu: number = 0;
  activeMenuIndex!: number;
  constructor(private _router: Router) {
    this.sidebarMenu.filter((val) => {
      let splitUrl = this._router.url.split('/');
      if (splitUrl[2] === val.route) {
        this.activeMenu = val.selfIndex;
      }
    });
  }

  ngOnInit(): void {}

  activeClass(index: number) {
    this.activeMenu = index;
  }
}
