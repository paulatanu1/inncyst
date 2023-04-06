import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from '../share/header/header.component';
import { FooterComponent } from '../share/footer/footer.component';
import { SliderComponent } from '../share/slider/slider.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ButtonModule} from 'primeng/button';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ApplySectionComponent } from '../share/intern-apply/apply-section.component';
import { WhatWeDoComponent } from '../share/what-we-do/what-we-do.component';
import { GetJobComponent } from '../share/get-job/get-job.component';
import { VideoSectionComponent } from '../share/video-section/video-section.component';
import { GallerySectionComponent } from '../share/gallery-section/gallery-section.component';
import { OurTeamComponent } from '../share/our-team/our-team.component';
import { TestimonialsComponent } from '../share/testimonials/testimonials.component';
import { VisitorsComponent } from '../share/visitors/visitors.component';
import { ExprienceComponent } from '../share/exprience/exprience.component';
import {DialogModule} from 'primeng/dialog';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import { MiniHeaderComponent } from '../share/mini-header/mini-header.component';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    ApplySectionComponent,
    WhatWeDoComponent,
    GetJobComponent,
    VideoSectionComponent,
    GallerySectionComponent,
    OurTeamComponent,
    TestimonialsComponent,
    VisitorsComponent,
    ExprienceComponent,
    MiniHeaderComponent
  ],
  imports: [
    CommonModule,
     SharedRoutingModule,
     SplitButtonModule,
     ButtonModule,
     CarouselModule,
     DialogModule,
     TabMenuModule,
     TabViewModule,
     InputTextModule,
     PasswordModule,
     RippleModule
    ],
  exports: [
    HeaderComponent, 
    FooterComponent,
    SliderComponent,
    SplitButtonModule,
    ButtonModule,
    CarouselModule,
    ApplySectionComponent,
    WhatWeDoComponent,
    GetJobComponent,
    VideoSectionComponent,
    GallerySectionComponent,
    OurTeamComponent,
    TestimonialsComponent,
    VisitorsComponent,
    ExprienceComponent,
    DialogModule,
    TabMenuModule,
    TabViewModule,
    InputTextModule,
    PasswordModule,
    MiniHeaderComponent,
    RippleModule

  ],
})
export class SharedModule {}
