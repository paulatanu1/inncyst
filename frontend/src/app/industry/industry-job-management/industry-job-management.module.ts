import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryJobManagementRoutingModule } from './industry-job-management-routing.module';
import { IndustryJobManagementComponent } from './industry-job-management.component';


@NgModule({
  declarations: [
    IndustryJobManagementComponent
  ],
  imports: [
    CommonModule,
    IndustryJobManagementRoutingModule
  ]
})
export class IndustryJobManagementModule { }
