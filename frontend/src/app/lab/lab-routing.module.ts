import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabComponent } from './lab.component';

const routes: Routes = [
  {
    path: '',
    component: LabComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../lab-components/lab-dashboard/lab-dashboard.module').then(
            (m) => m.LabDashboardModule
          ),
      },
      {
        path: 'facilites',
        loadChildren: () =>
          import('../lab-components/lab-facilites/lab-facilites.module').then(
            (m) => m.LabFacilitesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabRoutingModule {}
