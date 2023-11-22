import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsManagementComponent } from '../jobs-management/jobs-management.component';
import { PostAddComponent } from '../post-add/post-add.component';

const routes: Routes = [
  { path: '', component: JobsManagementComponent },
  {path:'add-job',component:PostAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryJobManagementRoutingModule { }
