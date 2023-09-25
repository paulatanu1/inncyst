import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternshipsComponent } from './internships/internships.component';
import { JobsComponent } from './jobs.component';
import { RequiredSkillStepComponent } from './required-skill-step/required-skill-step.component';
import { UploadResumeStepComponent } from './upload-resume-step/upload-resume-step.component';
import { BasicInternshipComponent } from './basic-internship/basic-internship.component';
import { JobApplyedComponent } from './job-applyed/job-applyed.component';
const routes: Routes = [{ path: '', component: JobsComponent },
{path:'basicInternship',component:BasicInternshipComponent},
{ path: 'internships', component: InternshipsComponent,children:[
  // {path:'',redirectTo:'skills',pathMatch:'full'},
  {path:'skills',component:RequiredSkillStepComponent},
  {path:'uploadresume', component:UploadResumeStepComponent}
] }, { path: 'job-applyed', component: JobApplyedComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
