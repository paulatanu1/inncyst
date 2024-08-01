import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientManageComponent } from './client-manage.component';
import { AdminPrivacyPolicyComponent } from './admin-privacy-policy/admin-privacy-policy.component';
import { AdminRefundPloicyComponent } from './admin-refund-ploicy/admin-refund-ploicy.component';
import { AdminDashboardContentComponent } from './admin-dashboard-content/admin-dashboard-content.component';

const routes: Routes = [
  {
    path: '',
    component: ClientManageComponent,
  },
  { path: 'privacy&policy', component: AdminPrivacyPolicyComponent },
  { path: 'refund-policy', component: AdminRefundPloicyComponent },
  { path: 'dashboard-content', component: AdminDashboardContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientManageRoutingModule {}
