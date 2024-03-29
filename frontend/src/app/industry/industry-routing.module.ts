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
import { IndustryProfileComponent } from './industry-profile/industry-profile.component';
import { QuestionStepGuard } from '../Guard/question-step.guard';
import { ChangePasswordComponent } from '../share/change-password/change-password.component';

const routes:Routes = [
  {path:'',component:IndustryComponent, 
  children:[
    {path:'',component:IndustryDashboardComponent ,canActivate:[QuestionStepGuard] },
    { path: 'jobs', loadChildren: () => import('./industry-job-management/industry-job-management.module').then(m => m.IndustryJobManagementModule) ,canActivate:[IndustryVerificationGuard,QuestionStepGuard]  ,},
    {path:'reports',component:IndustryReportsComponent,canActivate:[IndustryVerificationGuard,QuestionStepGuard]  ,},
    {path:'appliedStudentList',component:AppliedStudenListComponent,canActivate:[IndustryVerificationGuard,QuestionStepGuard]},
    {path:'profile',component:IndustryProfileComponent,canActivate:[IndustryVerificationGuard]},
    {path:'changePassword',component:ChangePasswordComponent,canActivate:[QuestionStepGuard]}
  ]},
  // { path: 'jobs', loadChildren: () => import('./industry-job-management/industry-job-management.module').then(m => m.IndustryJobManagementModule) }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryRoutingModule { }
