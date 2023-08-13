import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryDashboardRoutingModule } from './industry-dashboard-routing.module';
import { IndustryDashboardComponent } from './industry-dashboard.component';


@NgModule({
  declarations: [
    IndustryDashboardComponent
  ],
  imports: [
    CommonModule,
    IndustryDashboardRoutingModule
  ]
})
export class IndustryDashboardModule { }
