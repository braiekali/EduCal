import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { FrontComponent } from './layouts/front/front.component';

import { AppSideLoginComponent } from './pages/authentication/login/login.component';
import { AppSideRegisterComponent } from './pages/authentication/register/register.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: FullComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'dashboard/home',
      //   pathMatch: 'full',
      // },
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./manage-user/user.module').then((m) => m.UserModule),
      },
      // nawres
      {
        path: 'foyers',
        loadChildren: () =>
          import('./manage-foyer/foyer.module').then((m) => m.FoyerModule),
      },
    
      {
        path: 'universities',
        loadChildren: () =>
          import('./manage-university/university.module').then(
            (m) => m.UniversityModule
          ),
      },
    ],
  },

  //front-----------------------
  {
    path: '',
    component: FrontComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: LandingpageComponent,
      },
      {
        path: 'universities',
        loadChildren: () =>
          import('./manage-university/university.module').then(
            (m) => m.UniversityModule
          ),
      },
      {
        path: 'specialities',
        loadChildren: () =>
          import('./manage-specialite/specialite.module').then(
            (m) => m.SpecialiteModule
          ),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./manage-club/club.module').then((m) => m.ClubModule),
      },
        // nawres
        {
          path: 'foyers',
          loadChildren: () =>
            import('./manage-foyer/foyer.module').then((m) => m.FoyerModule),
        },
     
      {
        path: '',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '**',
    component: FrontComponent,
    children: [
      {
        path: '',
        component: NotfoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
