import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MentorsRoutingModule } from './mentors-routing.module';
import { MentorsComponent } from './mentors.component';
import { MentorsFormComponent } from './mentors-form/mentors-form.component';
import { MentorDashboardComponent } from './mentor-dashboard/mentor-dashboard.component';
import { MentorHeaderComponent } from './mentor-header/mentor-header.component';
import { MentorFooterComponent } from './mentor-footer/mentor-footer.component';

@NgModule({
  declarations: [
    MentorsComponent,
    MentorsFormComponent,
    MentorDashboardComponent,
    MentorHeaderComponent,
    MentorFooterComponent,
  ],
  imports: [CommonModule, MentorsRoutingModule, MatIconModule],
})
export class MentorsModule {}
