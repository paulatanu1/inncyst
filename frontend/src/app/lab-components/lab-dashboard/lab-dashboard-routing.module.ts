import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabDashboardComponent } from './lab-dashboard.component';

const routes: Routes = [{ path: '', component: LabDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabDashboardRoutingModule { }
