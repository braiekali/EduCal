import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityListDashComponent } from './university-list-dash/university-list-dash.component';
import { UniversityDetailDashComponent } from './university-detail-dash/university-detail-dash.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { UniversityListComponent } from './university-list/university-list.component';
import { UniversityDetailComponent } from './university-detail/university-detail.component';
import {UniversityUpdateComponent} from "./university-update/university-update.component";
import {NewsDetailsDashComponent} from "./news-details-dash/news-details-dash.component";

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: UniversityListDashComponent,
      },
      {
        path: ':id',
        component: UniversityDetailDashComponent,
      },
      {
        path: 'update/:id',
        component: UniversityUpdateComponent,
      },
      {
        path: 'news/:id',
        component: NewsDetailsDashComponent,
      },
      {
        path: 'news/update/:id',
        component: UniversityUpdateComponent,
      },

    ],
  },
  {
    path: '',
    component: UniversityListComponent,
  },
  {
    path: ':id',
    component: UniversityDetailComponent,
  },
  {
    path: 'news',
    children: [
      {
        path: '',
        component: NewsDetailsComponent,
      },
      {
        path: ':id',
        component: NewsDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUniversityRoutingModule {}
