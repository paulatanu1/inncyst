import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardHeaderComponent } from './common/dashboard-header/dashboard-header.component';
import { AdminLeftPanelComponent } from './common/admin-left-panel/admin-left-panel.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    AdminLeftPanelComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
