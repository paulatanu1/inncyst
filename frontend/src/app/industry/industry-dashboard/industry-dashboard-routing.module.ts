import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryDashboardComponent } from './industry-dashboard.component';
import { JobsManagementComponent } from '../jobs-management/jobs-management.component';

const routes: Routes = [
  { path: '', component: IndustryDashboardComponent },
  { path: 'jobs', component: JobsManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryDashboardRoutingModule { }
