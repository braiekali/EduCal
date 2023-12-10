
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventService } from '../services/event.service';
import {Event} from "../models/events";
import Swal from 'sweetalert2';
import {UpdateEventComponent} from "../update-event/update-event.component";

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-list-event-dash',
  templateUrl: './list-event-dash.component.html',
  styleUrls: ['./list-event-dash.component.scss']
})
export class ListEventDashComponent {
  uploadUrl = 'http://localhost:8087/upload-directory/';

  searchInput: string = '';
  dataSource: any;
  displayedColumns: string[] = [ 'image','nom', 'dateDeb', 'dateFin', 'Description','Location',   'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private addEventDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private updateEventDialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.refreshEventList();
  }
  refreshEventList(): void {
    this.eventService.getAllEvents().subscribe(
      (data: any) => {
        this.dataSource = data;
        this.dataSource = new MatTableDataSource(this.dataSource);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.error('Une erreur est survenue :', error);
      }
    );

  }

  openAddEventDialog(): void {
    const dialogRef = this.addEventDialog.open(AddEventComponent, {
      width: '550px',

    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result after the dialog is closed (if needed)
      if (result) {
        this.refreshEventList();
        console.log('The dialog save pressed', result);
      } else {
        console.log('The dialog was closed', result);
      }
    });
  }

  onDeleteEvent(id: any): void {
    this.eventService.deleteEvent(id).subscribe(
      () => {
        this.refreshEventList();
      }
      // handle errors...
    );
  }

  openUpdateDialog(eventId: any): void {
    this.eventService.getEvent(eventId).subscribe(
      (eventData) => {
        const dialogRef = this.updateEventDialog.open(
          UpdateEventComponent,
          {
            width: '550px',
            data: eventData,
          }
        );

        // Vous pouvez également écouter la fermeture du dialogue si nécessaire
        dialogRef.afterClosed().subscribe((result) => {
          this.refreshEventList();
          console.log('Dialog closed with result:', result);
        });
      },
      (error) => {
        console.error('Error fetching club data:', error);
      }
    );
  }
}
