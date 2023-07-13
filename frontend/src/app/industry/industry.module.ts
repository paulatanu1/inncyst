import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryRoutingModule } from './industry-routing.module';
import { IndustryComponent } from './industry.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostListComponent } from './post-list/post-list.component';


@NgModule({
  declarations: [
    IndustryComponent,
    PostAddComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    IndustryRoutingModule
  ]
})
export class IndustryModule { }
