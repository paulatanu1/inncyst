import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansManageRoutingModule } from './plans-manage-routing.module';
import { PlansManageComponent } from './plans-manage.component';


@NgModule({
  declarations: [
    PlansManageComponent
  ],
  imports: [
    CommonModule,
    PlansManageRoutingModule
  ]
})
export class PlansManageModule { }
