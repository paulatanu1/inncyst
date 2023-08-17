import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryComponent } from './industry.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostAddComponent } from './post-add/post-add.component';
import { IndustryDashboardComponent } from './industry-dashboard/industry-dashboard.component';
import { JobsManagementComponent } from './jobs-management/jobs-management.component';
import { IndustryReportsComponent } from './industry-reports/industry-reports.component';

const routes:Routes = [
  {path:'',component:IndustryComponent,children:[
    {path:'',component:IndustryDashboardComponent},
    {path:'jobs',component:JobsManagementComponent},
    {path:'reports',component:IndustryReportsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryRoutingModule { }
