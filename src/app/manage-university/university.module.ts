import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ManageUniversityRoutingModule } from './university-routing.module';
import { UniversityListDashComponent } from './university-list-dash/university-list-dash.component';
import { AddUniversityDialogDashComponent } from './add-university-dialog-dash/add-university-dialog-dash.component';
import { UniversityDetailDashComponent } from './university-detail-dash/university-detail-dash.component';
import { AddNewsDialogDashComponent } from './add-news-dialog-dash/add-news-dialog-dash.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { UniversityListComponent } from './university-list/university-list.component';
import { UniversityDetailComponent } from './university-detail/university-detail.component';
import { UniversityUpdateComponent } from './university-update/university-update.component';
import { NewsDetailsDashComponent } from './news-details-dash/news-details-dash.component';
import { NewsUpdateComponent } from './news-update/news-update.component';
import { ErrorComponent } from './error/error.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    UniversityListDashComponent,
    AddUniversityDialogDashComponent,
    UniversityDetailDashComponent,
    AddNewsDialogDashComponent,
    NewsDetailsComponent,
    UniversityListComponent,
    UniversityDetailComponent,
    UniversityUpdateComponent,
    NewsDetailsDashComponent,
    NewsUpdateComponent,
    ErrorComponent,
    CardComponent,
  ],
    imports: [
        CommonModule,
        ManageUniversityRoutingModule,
        MaterialModule,
        FormsModule,
        TablerIconsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ],
  exports: [TablerIconsModule],
})
export class UniversityModule {}
