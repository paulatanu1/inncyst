import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabDashboardRoutingModule } from './lab-dashboard-routing.module';
import { LabDashboardComponent } from './lab-dashboard.component';


@NgModule({
  declarations: [
    LabDashboardComponent
  ],
  imports: [
    CommonModule,
    LabDashboardRoutingModule
  ]
})
export class LabDashboardModule { }
