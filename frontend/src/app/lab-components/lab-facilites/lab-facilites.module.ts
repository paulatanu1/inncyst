import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabFacilitesRoutingModule } from './lab-facilites-routing.module';
import { LabFacilitesComponent } from './lab-facilites.component';


@NgModule({
  declarations: [
    LabFacilitesComponent
  ],
  imports: [
    CommonModule,
    LabFacilitesRoutingModule
  ]
})
export class LabFacilitesModule { }
