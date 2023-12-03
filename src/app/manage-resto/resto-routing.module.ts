import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestoListComponent} from "./resto-list/resto-list.component";
import {PlatsDetailsComponent} from "./plats-details/plats-details.component";
import {RestoDetailsComponent} from "./plats-details-dash/resto-details.component";
import {UniversityListDashComponent} from "../manage-university/university-list-dash/university-list-dash.component";
import {
  UniversityDetailDashComponent
} from "../manage-university/university-detail-dash/university-detail-dash.component";
import {RestoListDashComponent} from "./resto-list-dash/resto-list-dash.component";
import {RestoDetailDashComponent} from "./resto-detail-dash/resto-detail-dash.component";
import {RestoDetailUserComponent} from "./resto-detail-user/resto-detail-user.component";

const routes: Routes = [

  {
    path: 'admin',
    children: [
      {
        path: '',
        component: RestoListDashComponent,
      },
      {
        path: ':id',
        component: RestoDetailDashComponent,
      },
    ],
  },{
    path: 'listResto',
    component: RestoListComponent,
  },

  {
    path: 'Plats-detail',
    children: [
      {
        path: '',
        component: PlatsDetailsComponent,
      },
      {
        path: ':id',
        component: PlatsDetailsComponent,
      },
    ],
  },
  {
    path: 'plats',
    children: [
      {
        path: '',
        component: RestoDetailsComponent,
      },
      {
        path: ':id',
        component: RestoDetailsComponent,
      },
    ],
  },
  {
    path: 'restodetail',
    children: [
      {
        path: '',
        component: RestoDetailUserComponent,
      },
      {
        path: ':id',
        component: RestoDetailUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestoRoutingModule { }
