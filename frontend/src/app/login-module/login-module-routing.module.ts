import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModuleComponent } from './login-module.component';
import { LoginComponent } from '../share/login/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginModuleRoutingModule { }
