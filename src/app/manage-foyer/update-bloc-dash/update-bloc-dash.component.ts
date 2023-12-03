import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoyerService } from '../service/foyer.service';
import { Bloc } from '../model/Bloc';
import { ActivatedRoute } from '@angular/router';
import { BlocService } from '../service/bloc.service';

@Component({
  selector: 'app-update-bloc-dash',
  templateUrl: './update-bloc-dash.component.html',
  styleUrls: ['./update-bloc-dash.component.scss']
})
export class UpdateBlocDashComponent {

  idFoyer: number;
  idBloc: number;
  img: string = "./assets/images/manage-foyer/";
  constructor(
    public updateDialogRef: MatDialogRef<UpdateBlocDashComponent>, private serviceFoyer: FoyerService,
    private fb: FormBuilder, private route: ActivatedRoute, private blocService: BlocService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formbuild.patchValue({
      ...data,
      nomFoyer: data.foyer?.nomFoyer
    });
  }

  formbuild = this.fb.group({
    idBloc: ['', [Validators.required]],
    nomBloc: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    capaciteBloc: ['', [Validators.required, Validators.max(300)]],
    nombreEtage: ['', [Validators.required]],
    newImageBloc: [''] ,
    nomFoyer: [''],
    imageBloc:[''],
   

  });

  ngOnInit(): void {
    this.serviceFoyer.foyerId$.subscribe((foyerId) => {
      this.idFoyer = foyerId;
      console.log(' id foyer', this.idFoyer)
      console.log('Data in UpdateBlocDashComponent:', this.data);
    });
  }

  updateBloc(form: any) {
    console.log('Form Value:', form);
    const formData: Bloc = {
      ...this.data,
      ...this.formbuild.value,

    };

    if (form.newImageBloc) {
      formData.imageBloc = this.img + form.newImageBloc.replace("C:\\fakepath\\", "");
    }

    this.blocService.updateBlocForFoyer(this.idFoyer, this.data.idBloc, formData).subscribe(
      () => {
        alert('Êtes-vous sûr de vouloir modifier ce bloc ?');
        console.log('Mise à jour réussie');
        this.formbuild.reset();
        window.location.reload();
        this.updateDialogRef.close();
        console.log('Updated Bloc:', formData);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour :', error);
        console.log('Valeur du bloc après modification:', this.formbuild.value);
      }
    );
    
  }
 



}