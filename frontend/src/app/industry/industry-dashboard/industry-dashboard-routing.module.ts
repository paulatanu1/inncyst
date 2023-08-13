import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryDashboardComponent } from './industry-dashboard.component';

const routes: Routes = [{ path: '', component: IndustryDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryDashboardRoutingModule { }
