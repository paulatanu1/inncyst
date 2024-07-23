import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SubscriptionPlansComponent } from './pages/subscription-plans/subscription-plans.component';
import { IndustryListComponent } from './pages/industry-list/industry-list.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { AclComponent } from './pages/acl/acl.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: AdminComponent,
//     children: [
//       { path: 'dashboard', component: DashboardComponent },
//       // { path: 'plans-management', component: DashboardComponent },
//       {
//         path: 'plans-management',
//         loadChildren: () =>
//           import('./pages/plans-manage/plans-manage.module').then(
//             (m) => m.PlansManageModule
//           ),
//       },
//       {
//         path: 'client-portal-contant-manage',
//         loadChildren: () =>
//           import('./pages/client-manage/client-manage.module').then(
//             (m) => m.ClientManageModule
//           ),
//       },
//       { path: 'subscriptions', component: SubscriptionPlansComponent },
//       {
//         path: 'employer-management',
//         component: IndustryListComponent,
//       },
//       {
//         path: 'student-management',
//         component: StudentListComponent,
//       },
//       {
//         path: 'acl-manage',
//         component: AclComponent,
//       },
//     ],
//   },
//   {
//     path: 'pages/plans-manage',
//     loadChildren: () =>
//       import('./pages/plans-manage/plans-manage.module').then(
//         (m) => m.PlansManageModule
//       ),
//   },
//   {
//     path: 'pages/client-manage',
//     loadChildren: () =>
//       import('./pages/client-manage/client-manage.module').then(
//         (m) => m.ClientManageModule
//       ),
//   },
// ];

@NgModule({
  // imports: [RouterModule.forChild()],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
