import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryJobManagementRoutingModule } from './industry-job-management-routing.module';
import { IndustryJobManagementComponent } from './industry-job-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobsManagementComponent } from '../jobs-management/jobs-management.component';

@NgModule({
  declarations: [IndustryJobManagementComponent],
  imports: [IndustryJobManagementRoutingModule, SharedModule],
})
export class IndustryJobManagementModule {}
