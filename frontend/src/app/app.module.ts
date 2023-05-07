import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule,BrowserAnimationsModule,FormsModule,ReactiveFormsModule,RouterModule.forRoot([])],
  exports: [SharedModule,FormsModule,ReactiveFormsModule],
  providers: [SharedModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
