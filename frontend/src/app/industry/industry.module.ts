import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndustryRoutingModule } from './industry-routing.module';
import { IndustryComponent } from './industry.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostListComponent } from './post-list/post-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndustryLeftPanelComponent } from './industry-left-panel/industry-left-panel.component';
import { IndustryTopRightPanelComponent } from './industry-top-right-panel/industry-top-right-panel.component';
import { IndustryTopPanelComponent } from './industry-top-panel/industry-top-panel.component';
import { IndustryReportsComponent } from './industry-reports/industry-reports.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SplitButtonModule } from 'primeng/splitbutton';
import { JobsManagementComponent } from './jobs-management/jobs-management.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AppliedStudenListComponent } from './applied-studen-list/applied-studen-list.component';
@NgModule({
  declarations: [
    IndustryComponent,
    PostAddComponent,
    PostListComponent,
    IndustryLeftPanelComponent,
    IndustryTopPanelComponent,
    IndustryTopRightPanelComponent,
    IndustryReportsComponent,
    JobsManagementComponent,
    AppliedStudenListComponent,
  ],
  imports: [
    CommonModule,
    IndustryRoutingModule,
    SharedModule,
    FormsModule,
    InputSwitchModule,
    SplitButtonModule,
    ReactiveFormsModule,InfiniteScrollModule
  ],
  exports: [InputSwitchModule, SplitButtonModule, SharedModule],
})
export class IndustryModule {}
