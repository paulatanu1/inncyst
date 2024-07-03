import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientManageComponent } from './client-manage.component';

const routes: Routes = [{ path: '', component: ClientManageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManageRoutingModule { }
