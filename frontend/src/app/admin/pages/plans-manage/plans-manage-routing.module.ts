import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansManageComponent } from './plans-manage.component';

const routes: Routes = [{ path: '', component: PlansManageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansManageRoutingModule { }
