import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { BannerCardsComponent } from './banner-cards/banner-cards.component';
import { InternshipsComponent } from './internships/internships.component';
import {DialogModule} from 'primeng/dialog';
import {MenuItem} from 'primeng/api';
import {StepsModule} from 'primeng/steps';

@NgModule({
  declarations: [
    JobsComponent,
    BannerCardsComponent,
    InternshipsComponent,
    
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    DialogModule,
    StepsModule  ],
  exports:[DialogModule]
})
export class JobsModule { }
