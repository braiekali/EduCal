import { Component, ViewChild } from '@angular/core';
import { BlocService } from '../service/bloc.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FoyerService } from '../service/foyer.service';
import { Foyer } from '../model/Foyer';
import { Bloc } from '../model/Bloc';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-bloc-dialog-dash',
  templateUrl: './add-bloc-dialog-dash.component.html',
  styleUrls: ['./add-bloc-dialog-dash.component.scss']
})
export default class AddBlocDialogDashComponent {
  img: string = "./assets/images/manage-foyer/";
  foyers: Foyer[] = [];
  idFoyer: number
  constructor(
    private foyerService: FoyerService, public addDialogRef: MatDialogRef<AddBlocDialogDashComponent>
    , private blocservice: BlocService ) { }
  @ViewChild('fileInput') fileInput: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.foyerService.foyerId$.subscribe((foyerId) => {
      this.idFoyer = foyerId;
      console.log('add bloc with id foyer', this.idFoyer)

    });

  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {

      const reader = new FileReader();
      reader.onload = (e: any) => {

      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  closeDialog(): void {
    this.addDialogRef.close();

  }


  onSubmit(form: NgForm): void {
    if (form.valid) {
      const bloc: Bloc = {
        nomBloc: form.value.nomBloc,
        capaciteBloc: form.value.capaciteBloc,
        nombreEtage: form.value.nombreEtage,
        imageBloc: form.value.imageBloc,
        idBloc: 0,
        foyer: form.value.foyer,
        chambres: [],

      };

      this.ajouterBloc(bloc);
    }
  }


  ajouterBloc(bloc: Bloc): void {
    if (bloc.imageBloc) {
      bloc.imageBloc = bloc.imageBloc.replace("C:\\fakepath\\", "");

      bloc.imageBloc = this.img + bloc.imageBloc;

    }
    this.blocservice.ajouterBlocAuFoyer(this.idFoyer, bloc).subscribe(
      () => {
        console.log('Bloc ajouté avec succès !');
        window.location.reload()
        this.closeDialog();

      },
      (error) => {
        console.error('Erreur lors de l\'ajout du bloc :', error);

      }
    );


  }




}