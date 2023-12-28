import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternshipsComponent } from './internships/internships.component';
import { JobsComponent } from './jobs.component';
import { RequiredSkillStepComponent } from './required-skill-step/required-skill-step.component';
import { UploadResumeStepComponent } from './upload-resume-step/upload-resume-step.component';
import { BasicInternshipComponent } from './basic-internship/basic-internship.component';
import { JobApplyedComponent } from './job-applyed/job-applyed.component';
import { AppliedJobDetailsComponent } from './applied-job-details/applied-job-details.component';
import { BasicJobComponent } from './basic-job/basic-job.component';
import { UserVerificationGuard } from '../Guard/user-verification.guard';
import { JobDetailsComponent } from './job-details/job-details.component';
const routes: Routes = [
  { path: '', component: JobsComponent },
  { path: 'basicInternship', component: BasicInternshipComponent },
  {path:'details/:id',component:JobDetailsComponent},
  {
    path: 'posts',
    canActivate: [UserVerificationGuard],
    component: InternshipsComponent,
    children: [
     
      // {path:'',redirectTo:'skills',pathMatch:'full'},
      { path: 'skills', component: RequiredSkillStepComponent },
      { path: 'uploadresume', component: UploadResumeStepComponent },
    ],
  },
  {
    path: 'my-jobs',
    component: BasicJobComponent,
    canActivate: [UserVerificationGuard],
    children: [
      { path: '', component: JobApplyedComponent },
      {
        path: 'AppliedJobDetailsComponent/:id',
        component: AppliedJobDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
