import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterationRoutingModule } from './registeration-routing.module';
import { RegisterationComponent } from './registeration.component';


@NgModule({
  declarations: [
    RegisterationComponent
  ],
  imports: [
    CommonModule,
    RegisterationRoutingModule
  ]
})
export class RegisterationModule { }
