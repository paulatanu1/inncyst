import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabRoutingModule } from './lab-routing.module';
import { LabComponent } from './lab.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LabHeaderComponent } from './lab-common/lab-header/lab-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { LabMenuItemComponent } from './lab-common/lab-menu-item/lab-menu-item.component';
import { MatListModule } from '@angular/material/list';
import { LabPageHeaderComponent } from './lab-common/lab-page-header/lab-page-header.component';
import { FacilitesListComponent } from '../lab-components/inner-component/facilites-list/facilites-list.component';
import { FacilitesAddComponent } from '../lab-components/inner-component/facilites-add/facilites-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LabComponent,
    LabHeaderComponent,
    LabMenuItemComponent,
    LabPageHeaderComponent,
    FacilitesListComponent,
    FacilitesAddComponent,
  ],
  imports: [
    CommonModule,
    LabRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LabModule {}
