import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientManageRoutingModule } from './client-manage-routing.module';
import { ClientManageComponent } from './client-manage.component';


@NgModule({
  declarations: [
    ClientManageComponent
  ],
  imports: [
    CommonModule,
    ClientManageRoutingModule
  ]
})
export class ClientManageModule { }
