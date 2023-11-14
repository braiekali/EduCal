import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListDashComponent } from './user-list-dash/user-list-dash.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UserListDashComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
