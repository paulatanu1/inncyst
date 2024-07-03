import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterAdminComponent } from './common/footer-admin/footer-admin.component';
import { IndustryListComponent } from './pages/industry-list/industry-list.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { SubscriptionPlansComponent } from './pages/subscription-plans/subscription-plans.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterAdminComponent,
    IndustryListComponent,
    StudentListComponent,
    SubscriptionPlansComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
