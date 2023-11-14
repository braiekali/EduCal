import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubRoutingModule } from './club-routing.module';
import { EventDetailsComponent } from './event-details/event-details.component';


@NgModule({
  declarations: [
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    ClubRoutingModule
  ]
})
export class ClubModule { }
