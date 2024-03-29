import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryDashboardRoutingModule } from './industry-dashboard-routing.module';
import { IndustryDashboardComponent } from './industry-dashboard.component';
import { IndustryLeftPanelComponent } from '../industry-left-panel/industry-left-panel.component';
import { IndustryTopPanelComponent } from '../industry-top-panel/industry-top-panel.component';
import { IndustryTopRightPanelComponent } from '../industry-top-right-panel/industry-top-right-panel.component';
import { JobsManagementComponent } from '../jobs-management/jobs-management.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    IndustryDashboardComponent,
    // IndustryLeftPanelComponent,
    // IndustryTopPanelComponent,
    // IndustryTopRightPanelComponent,
    // JobsManagementComponent,
  ],
  imports: [CommonModule, IndustryDashboardRoutingModule, SharedModule],
  exports: [SharedModule],
})
export class IndustryDashboardModule {}
