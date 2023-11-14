import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialiteRoutingModule } from './specialite-routing.module';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { SpecialityDetailsComponent } from './speciality-details/speciality-details.component';

@NgModule({
  declarations: [
    SpecialitiesComponent,
    SpecialityDetailsComponent
  ],
  imports: [CommonModule, SpecialiteRoutingModule],
})
export class SpecialiteModule {}
