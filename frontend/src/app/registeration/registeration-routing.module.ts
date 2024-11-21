import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationPageComponent } from '../share/registration-page/registration-page.component';
import { RegisterationComponent } from './registeration.component';
import { RegistrationOtpComponent } from '../share/registration-otp/registration-otp.component';

const routes: Routes = [
  { path: '', component: RegistrationPageComponent },
  { path: 'verification', component: RegistrationOtpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterationRoutingModule {}
