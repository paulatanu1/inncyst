import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AclRoutingModule } from './acl-routing.module';
import { AclComponent } from './acl.component';


@NgModule({
  declarations: [
    AclComponent
  ],
  imports: [
    CommonModule,
    AclRoutingModule
  ]
})
export class AclModule { }
