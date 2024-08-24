import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabComponent } from './lab.component';

const routes: Routes = [{ path: '', component: LabComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
