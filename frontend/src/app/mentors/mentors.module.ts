import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MentorsRoutingModule } from './mentors-routing.module';
import { MentorsComponent } from './mentors.component';
import { MentorsFormComponent } from './mentors-form/mentors-form.component';
import { MentorDashboardComponent } from './mentor-dashboard/mentor-dashboard.component';
import { MentorHeaderComponent } from './mentor-header/mentor-header.component';
import { MentorFooterComponent } from './mentor-footer/mentor-footer.component';
import { NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table'; // For mat-table
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogMentorProfile } from './mentor-dashboard/mentor-add-profile.component';
import { DialogAddExperienceComponent } from './mentor-dashboard/add-experience-dialog';
import { ViewRequestComponent } from './view-request/view-request.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MentorHomeComponent } from './mentor-home/mentor-home.component';
import { SharedModule } from '../shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    MentorsComponent,
    MentorsFormComponent,
    MentorDashboardComponent,
    MentorHeaderComponent,
    MentorFooterComponent,
    DialogMentorProfile,
    DialogAddExperienceComponent,
    ViewRequestComponent,
    MentorHomeComponent,
  ],
  imports: [
    CommonModule,
    MentorsRoutingModule,
    MatIconModule,
    NgChartsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    MatAutocompleteModule,
  ],
})
export class MentorsModule {}
