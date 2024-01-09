import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationPageComponent } from './share/registration-page/registration-page.component';
import { MyProfileComponent } from './share/my-profile/my-profile.component';
import { ChangePasswordComponent } from './share/change-password/change-password.component';
import { PageNotFoundComponent } from './share/page-not-found/page-not-found.component';
import { UserVerificationGuard } from './Guard/user-verification.guard';
import { AuthenticateGuard } from './Guard/authenticate.guard';
import { ProtfolioComponent } from './share/protfolio/protfolio.component';
import { OutsideUrlProtectGuard } from './Guard/outside-url-protect.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./homepage/homepage.module').then((m) => m.HomepageModule)
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then((m) => m.JobsModule),
  },
  {
    path: 'contactus',
    loadChildren: () =>
      import('./contact-us/contact-us.module').then((m) => m.ContactUsModule),canActivate:[OutsideUrlProtectGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./about-us/about-us.module').then((m) => m.AboutUsModule),canActivate:[OutsideUrlProtectGuard]
  },
  {
    path: 'registeration',
    loadChildren: () =>
      import('./registeration/registeration.module').then(
        (m) => m.RegisterationModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    
  },
  {
    path: 'industry',
    loadChildren: () =>
      import('./industry/industry.module').then((m) => m.IndustryModule),
    canActivate: [AuthenticateGuard],
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path:'my-profile/protfolio',component:ProtfolioComponent,canActivate: [AuthenticateGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthenticateGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top'})],
  exports: [RouterModule],

})
export class AppRoutingModule {}
