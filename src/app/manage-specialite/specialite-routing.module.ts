import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { SpecialityDetailsComponent } from './speciality-details/speciality-details.component';

const routes: Routes = [
  {
    path: '',
    component: SpecialitiesComponent,
  },
  {
    path: ':id',
    component: SpecialityDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialiteRoutingModule {}
