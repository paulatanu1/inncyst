import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryRoutingModule } from './industry-routing.module';
import { IndustryComponent } from './industry.component';


@NgModule({
  declarations: [
    IndustryComponent
  ],
  imports: [
    CommonModule,
    IndustryRoutingModule
  ]
})
export class IndustryModule { }
