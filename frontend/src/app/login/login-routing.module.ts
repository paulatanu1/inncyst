import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../share/login-page/login-page.component';
import { LoginComponent } from './login.component';

const routes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
