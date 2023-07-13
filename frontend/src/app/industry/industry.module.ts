import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryRoutingModule } from './industry-routing.module';
import { IndustryComponent } from './industry.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostListComponent } from './post-list/post-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    IndustryComponent,
    PostAddComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    IndustryRoutingModule,
    SharedModule
  ]
})
export class IndustryModule { }
