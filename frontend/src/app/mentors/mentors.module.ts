import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorsRoutingModule } from './mentors-routing.module';
import { MentorsComponent } from './mentors.component';
import { MentorsFormComponent } from './mentors-form/mentors-form.component';


@NgModule({
  declarations: [
    MentorsComponent,
    MentorsFormComponent
  ],
  imports: [
    CommonModule,
    MentorsRoutingModule
  ]
})
export class MentorsModule { }
