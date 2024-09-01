import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabFacilitesComponent } from './lab-facilites.component';
import { FacilitesListComponent } from '../inner-component/facilites-list/facilites-list.component';
import { FacilitesAddComponent } from '../inner-component/facilites-add/facilites-add.component';

const routes: Routes = [
  { path: '', component: FacilitesListComponent },
  { path: 'add', component: FacilitesAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabFacilitesRoutingModule {}
