import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternshipsComponent } from './internships/internships.component';
import { JobsComponent } from './jobs.component';

const routes: Routes = [{ path: '', component: JobsComponent },
{ path: 'internships', component: InternshipsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
