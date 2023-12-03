import { AfterViewInit, Component, ViewChild, Input  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { BlocService } from '../service/bloc.service';
import AddBlocDialogDashComponent from '../add-bloc-dialog-dash/add-bloc-dialog-dash.component';
import { UpdateBlocDashComponent } from '../update-bloc-dash/update-bloc-dash.component';
import { Foyer } from '../model/Foyer';
@Component({
  selector: 'app-bloc-list-dash',
  templateUrl: './bloc-list-dash.component.html',
  styleUrls: ['./bloc-list-dash.component.scss']
})
export class BlocListDashComponent implements AfterViewInit {
  @Input() blocs: any[] = [];
  @Input() foyerId: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  idFoyer: number;
  foyer: Foyer;
  dataSource: any;
  idBloc: number
  displayedColumns: string[] = ['nomBloc', 'capaciteBloc', 'nombreEtage', 'action'];
 
  constructor(private addUserDialog: MatDialog, private blocservice: BlocService,
    private updateDialogRef: MatDialog, private blocService: BlocService
  ) { }

  deleteBloc(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?')) {
      this.blocservice.deleteBloc(id).subscribe(
        (data: any) => {
          window.location.reload()
        },
        (error) => {
          console.error('Error deleting bloc :', error);
        }
      );
    }

  }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  openAddBlocDialog(): void {
    const dialogRef = this.addUserDialog.open(
      AddBlocDialogDashComponent,
      {
        width: '550px', 
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('The dialog save pressed', result);
      } else {
        console.log('The dialog was closed', result);
      }
    });
  }



  openUpdateBlocDialog(bloc: any): void {
    const dialogRef = this.updateDialogRef.open(
      UpdateBlocDashComponent,
      {
        data: bloc,
        width: '550px', // Set the width as per your design
        // Add any other dialog configuration options here
      }
    );

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        console.log('The dialog save pressed', result);
      } else {
        console.log('The dialog was closed', result);
      }
    });
  }


}













