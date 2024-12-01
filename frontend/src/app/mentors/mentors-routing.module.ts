import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorsComponent } from './mentors.component';
import { MentorsFormComponent } from './mentors-form/mentors-form.component';

const routes: Routes = [{ path: '', component: MentorsFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorsRoutingModule {}
