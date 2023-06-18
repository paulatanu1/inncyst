import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationPageComponent } from '../share/registration-page/registration-page.component';
import { RegisterationComponent } from './registeration.component';

const routes: Routes = [
  { path: '', component: RegistrationPageComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterationRoutingModule { }
