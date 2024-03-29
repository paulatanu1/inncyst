import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { BannerCardsComponent } from './banner-cards/banner-cards.component';
import { InternshipsComponent } from './internships/internships.component';
import { DialogModule } from 'primeng/dialog';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { RequiredSkillStepComponent } from './required-skill-step/required-skill-step.component';
import { UploadResumeStepComponent } from './upload-resume-step/upload-resume-step.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { JobApplyedComponent } from './job-applyed/job-applyed.component';
import { TabViewModule } from 'primeng/tabview';
import { BasicInternshipComponent } from './basic-internship/basic-internship.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { AppliedJobDetailsComponent } from './applied-job-details/applied-job-details.component';
import { BasicJobComponent } from './basic-job/basic-job.component';
import { EditorModule } from 'primeng/editor';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobListProfileComponent } from './job-list-profile/job-list-profile.component';

@NgModule({
  declarations: [
    JobsComponent,
    BannerCardsComponent,
    InternshipsComponent,
    RequiredSkillStepComponent,
    UploadResumeStepComponent,
    JobApplyedComponent,
    BasicInternshipComponent,
    AppliedJobDetailsComponent,
    BasicJobComponent,
    JobDetailsComponent,
    JobListProfileComponent,
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    DialogModule,
    StepsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RadioButtonModule,
    FileUploadModule,
    TabViewModule,
    BreadcrumbModule,
    InfiniteScrollModule,
    DropdownModule,
    SliderModule,
    DialogModule,
    EditorModule,
    OverlayPanelModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [DialogModule, SharedModule],
  // providers:[LoginDetailsService]
})
export class JobsModule {}
