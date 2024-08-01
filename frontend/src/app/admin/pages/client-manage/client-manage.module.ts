import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientManageRoutingModule } from './client-manage-routing.module';
import { ClientManageComponent } from './client-manage.component';
import { AdminPrivacyPolicyComponent } from './admin-privacy-policy/admin-privacy-policy.component';
import { AdminRefundPloicyComponent } from './admin-refund-ploicy/admin-refund-ploicy.component';
import { AdminDashboardContentComponent } from './admin-dashboard-content/admin-dashboard-content.component';
import { NgxEditorModule } from 'ngx-editor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientManageComponent,
    AdminPrivacyPolicyComponent,
    AdminRefundPloicyComponent,
    AdminDashboardContentComponent,
  ],
  imports: [
    CommonModule,
    ClientManageRoutingModule,
    NgxEditorModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientManageModule {}
