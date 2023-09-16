import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { BannerCardsComponent } from './banner-cards/banner-cards.component';
import { InternshipsComponent } from './internships/internships.component';
import { DialogModule} from 'primeng/dialog';
import { MenuItem} from 'primeng/api';
import { StepsModule} from 'primeng/steps';
import { RequiredSkillStepComponent } from './required-skill-step/required-skill-step.component';
import { UploadResumeStepComponent } from './upload-resume-step/upload-resume-step.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule} from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { JobApplyedComponent } from './job-applyed/job-applyed.component';
import { TabViewModule } from 'primeng/tabview';
import {SpeedDialModule} from 'primeng/speeddial';
@NgModule({
  declarations: [
    JobsComponent,
    BannerCardsComponent,
    InternshipsComponent,
    RequiredSkillStepComponent,
    UploadResumeStepComponent,
    JobApplyedComponent
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
    SpeedDialModule
  ],
  exports:[DialogModule, SharedModule],
  // providers:[LoginDetailsService]
})
export class JobsModule { }
