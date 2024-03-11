import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginModuleRoutingModule } from './login-module-routing.module';
import { LoginModuleComponent } from './login-module.component';


@NgModule({
  declarations: [
    LoginModuleComponent
  ],
  imports: [
    CommonModule,
    LoginModuleRoutingModule
  ]
})
export class LoginModuleModule { }
