import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './share/login-page/login-page.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ChangePasswordComponent } from './share/change-password/change-password.component';
import { MyProfileComponent } from './share/my-profile/my-profile.component';
import { IndustryModule } from './industry/industry.module';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, ChangePasswordComponent, MyProfileComponent,],
  imports: [BrowserModule, NgOtpInputModule,AppRoutingModule, SharedModule,BrowserAnimationsModule,FormsModule,ReactiveFormsModule,RouterModule.forRoot([]),NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),HttpClientModule ],
  exports: [SharedModule,FormsModule,ReactiveFormsModule,NgOtpInputModule],
  providers: [SharedModule,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },NgOtpInputModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
