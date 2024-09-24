import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './share/login-page/login-page.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ChangePasswordComponent } from './share/change-password/change-password.component';
import { MyProfileComponent } from './share/my-profile/my-profile.component';
import { IndustryModule } from './industry/industry.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { LoginDetailsService } from './common-service/login-details.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PageNotFoundComponent } from './share/page-not-found/page-not-found.component';
import { ProtfolioComponent } from './share/protfolio/protfolio.component';
import { ProtfolioDetailsComponent } from './share/protfolio-details/protfolio-details.component';
import { EditorModule } from 'primeng/editor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SanitizerUrlPipe } from './pipe/sanitizer-url.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { ErrorPageComponent } from './error-page/error-page.component';
import {FieldsetModule} from 'primeng/fieldset';
import { TabViewModule } from 'primeng/tabview';
import { UploadcvComponent } from './share/uploadcv/uploadcv.component';
import { AddProjectComponent } from './share/add-project/add-project.component';
import { AchivmentComponent } from './share/achivment/achivment.component';
import { ComingSoonComponent } from './share/coming-soon/coming-soon.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ChangePasswordComponent,
    MyProfileComponent,
    PageNotFoundComponent,
    ProtfolioComponent,
    ProtfolioDetailsComponent,
    SanitizerUrlPipe,
    ErrorPageComponent,
    UploadcvComponent,
    AddProjectComponent,
    AchivmentComponent,
    ComingSoonComponent,
  ],
  imports: [
    BrowserModule,
    NgOtpInputModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    HttpClientModule,
    InfiniteScrollModule,
    EditorModule,
    PdfViewerModule,
    MatSliderModule,
    FieldsetModule,
    TabViewModule,
  ],
  exports: [SharedModule, FormsModule, ReactiveFormsModule, NgOtpInputModule],
  providers: [
    SharedModule,
    LoginDetailsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    NgOtpInputModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
