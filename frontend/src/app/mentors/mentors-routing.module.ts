import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorsComponent } from './mentors.component';
import { MentorsFormComponent } from './mentors-form/mentors-form.component';
import { MentorDashboardComponent } from './mentor-dashboard/mentor-dashboard.component';
import { ViewRequestComponent } from './view-request/view-request.component';
import { MentorHomeComponent } from './mentor-home/mentor-home.component';

const routes: Routes = [

  {
    path: 'mentors-details',
    component: MentorDashboardComponent,
  },
  { path: 'view-request', component: ViewRequestComponent },
  { path: '', component: MentorHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorsRoutingModule {}
