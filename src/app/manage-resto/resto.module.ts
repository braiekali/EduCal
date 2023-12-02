import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestoRoutingModule } from './resto-routing.module';
import { RestoListComponent } from './resto-list/resto-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RestoDetailsComponent } from './plats-details-dash/resto-details.component';
import { AddRestoDialogDashComponent } from './add-resto-dialog-dash/add-resto-dialog-dash.component';
import { AddPlatsDialogDashComponent } from './add-plats-dialog-dash/add-plats-dialog-dash.component';
import { PlatsDetailsComponent } from './plats-details/plats-details.component';
import { RestoDetailDashComponent } from './resto-detail-dash/resto-detail-dash.component';
import { RestoListDashComponent } from './resto-list-dash/resto-list-dash.component';
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { UpdateRestauComponent } from './update-restau/update-restau.component';
import { UpdatePlatDashComponent } from './update-plat-dash/update-plat-dash.component';
import { RestoDetailUserComponent } from './resto-detail-user/resto-detail-user.component';
import {AppErrorModule} from "../app-error/app-error.module";
import {ErrorComponent} from "../error/error.component";
import { StatisticsComponentComponent } from './statistics-component/statistics-component.component';
import {HighlightDirective} from "./highlight.directive";



@NgModule({
  declarations: [
    RestoListComponent,
    RestoDetailsComponent,
    AddRestoDialogDashComponent,
    AddPlatsDialogDashComponent,
    PlatsDetailsComponent,
    RestoDetailDashComponent,
    RestoListDashComponent,
    UpdateRestauComponent,
    UpdatePlatDashComponent,
    RestoDetailUserComponent,
    ErrorComponent,
    StatisticsComponentComponent,
    HighlightDirective,

  ],
  imports: [
    CommonModule,

    RestoRoutingModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    TablerIconsModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AppErrorModule,
  ]
})
export class RestoModule {
}
