import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import { SignUpQuestionsComponent } from '../share/sign-up-questions/sign-up-questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SidebarModule} from 'primeng/sidebar';
import {CalendarModule} from 'primeng/calendar';
import { LoginComponent } from '../share/login/login.component';
import { RegistrationOtpComponent } from '../share/registration-otp/registration-otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import {ToastModule} from 'primeng/toast';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { RegistrationPageComponent } from '../share/registration-page/registration-page.component';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {SlideMenuModule} from 'primeng/slidemenu';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
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
    OurTeamComponent,
    TestimonialsComponent,
    VisitorsComponent,
    ExprienceComponent,
    MiniHeaderComponent,
    SignUpQuestionsComponent,
    LoginComponent,
    RegistrationOtpComponent,
    ProgressBarComponent,
    RegistrationPageComponent
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
     RippleModule,
     InputNumberModule,
     DropdownModule,
     FormsModule,
     ReactiveFormsModule,
     SidebarModule,
     CalendarModule,
     NgOtpInputModule,
     ToastModule,
     ProgressBarModule,
     AvatarModule,
     AvatarGroupModule,
     SlideMenuModule,
     RadioButtonModule,
     CheckboxModule
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
    RippleModule,
    InputNumberModule,
    DropdownModule,
    SidebarModule,
    CalendarModule,
    NgOtpInputModule,
    ToastModule,
    ProgressBarModule,
    AvatarModule,
    AvatarGroupModule,
    SlideMenuModule,
    RadioButtonModule,
    CheckboxModule
  ],
  providers:[DatePipe]
})
export class SharedModule {}
