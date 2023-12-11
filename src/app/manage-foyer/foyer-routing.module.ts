import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoyerListDashComponent } from './foyer-list-dash/foyer-list-dash.component';
import { FoyerDetailDashComponent } from './foyer-detail-dash/foyer-detail-dash.component';

import { FoyerDetailComponent } from './foyer-detail/foyer-detail.component';
import { BlocDetailComponent } from './bloc-detail/bloc-detail.component';
import { UpdateFoyerDashComponent } from './update-foyer-dash/update-foyer.component';
import { UpdateBlocDashComponent } from './update-bloc-dash/update-bloc-dash.component';
import { BlocDetailDashComponent } from './bloc-detail-dash/bloc-detail-dash.component';
import { FoyerListComponent } from './foyer-list/foyer-list.component';
import { FoyerListResolverService } from './service/foyer-list-resolver.service';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: FoyerListDashComponent,
        resolve: {
          foyerList: FoyerListResolverService
        }
      },
      {
        path: ':id',
        component: FoyerDetailDashComponent,
      },
      
      {
        path: ':id',
        component: UpdateFoyerDashComponent,
      },

      {
        path: ':id',
        component: UpdateBlocDashComponent,
      },

      {
        path: ':idFoyer/:idBloc',
        component: BlocDetailDashComponent,
      },
      
    
    ],
  },

  {
    path: '',
    component: FoyerListComponent,
  },
  {
    path: ':id',
    component: FoyerDetailComponent,
  },
  {
    path: ':idFoyer/:idBloc',
    component: BlocDetailComponent,
  },

 
  {
    path: 'blocs',
    children: [
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyerRoutingModule { }
