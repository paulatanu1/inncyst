import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabRoutingModule } from './lab-routing.module';
import { LabComponent } from './lab.component';


@NgModule({
  declarations: [
    LabComponent
  ],
  imports: [
    CommonModule,
    LabRoutingModule
  ]
})
export class LabModule { }
