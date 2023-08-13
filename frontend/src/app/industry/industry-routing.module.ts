import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryComponent } from './industry.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostAddComponent } from './post-add/post-add.component';

const routes: Routes = [
  { path: 'post-list', component: PostListComponent },
  { path: 'add-post', component: PostAddComponent },
  { path: '', loadChildren: () => import('./industry-dashboard/industry-dashboard.module').then(m => m.IndustryDashboardModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryRoutingModule { }
