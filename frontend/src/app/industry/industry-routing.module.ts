import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryComponent } from './industry.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostAddComponent } from './post-add/post-add.component';
import { IndustryDashboardComponent } from './industry-dashboard/industry-dashboard.component';
import { JobsManagementComponent } from './jobs-management/jobs-management.component';
import { IndustryReportsComponent } from './industry-reports/industry-reports.component';
import { AuthenticateGuard } from '../Guard/authenticate.guard';
import { IndustryVerificationGuard } from '../Guard/industry-verification.guard';
import { AppliedStudenListComponent } from './applied-studen-list/applied-studen-list.component';

const routes:Routes = [
  {path:'',component:IndustryComponent, 
  children:[
    {path:'',component:IndustryDashboardComponent  },
    { path: 'jobs', loadChildren: () => import('./industry-job-management/industry-job-management.module').then(m => m.IndustryJobManagementModule) ,canActivate:[IndustryVerificationGuard]  ,},
    {path:'reports',component:IndustryReportsComponent,canActivate:[IndustryVerificationGuard]  ,},
    {path:'appliedStudentList',component:AppliedStudenListComponent,canActivate:[IndustryVerificationGuard]}
  ]},
  // { path: 'jobs', loadChildren: () => import('./industry-job-management/industry-job-management.module').then(m => m.IndustryJobManagementModule) }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryRoutingModule { }
