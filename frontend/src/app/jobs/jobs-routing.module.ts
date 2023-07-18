import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternshipsComponent } from './internships/internships.component';
import { JobsComponent } from './jobs.component';
import { RequiredSkillStepComponent } from './required-skill-step/required-skill-step.component';
import { UploadResumeStepComponent } from './upload-resume-step/upload-resume-step.component';

const routes: Routes = [{ path: '', component: JobsComponent },
{ path: 'internships', component: InternshipsComponent,children:[
  // {path:'',redirectTo:'skills',pathMatch:'full'},
  {path:'skills',component:RequiredSkillStepComponent},
  {path:'uploadresume', component:UploadResumeStepComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
