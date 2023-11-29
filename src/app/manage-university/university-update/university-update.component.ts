import {Component, ViewChild,Inject } from '@angular/core';
import {UniversiteService} from "../services/universite.service";
import {FormBuilder, Validators} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Foyer} from "../models/Foyer";

@Component({
  selector: 'app-university-update',
  templateUrl: './university-update.component.html',
  styleUrls: ['./university-update.component.scss']
})
export class UniversityUpdateComponent {
  idUniversite: number;
  foyers: Foyer[] = [];

  constructor(
    public updateDialogRef: MatDialogRef<UniversityUpdateComponent>,private serviceUniv:UniversiteService,private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.frombuil.patchValue({
      ...data,

    });
  }
  ngOnInit(): void {
    this.serviceUniv.getFoyers().subscribe(
      (data: any) => {
        this.foyers = data;
        console.log("Foyers:", this.foyers);
      },
      (error: any) => {
        console.error('Error fetching foyers:', error);
      }
    );
  }
  frombuil=this.fb.group({
    idUniversite:['',[Validators.required]],
    nomUniversite: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    adresseUniversite:['',[Validators.required]],
    ville:['',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    descriptionUniversite:['',[Validators.required]],
    telUniversite: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    emailUinversite:['', [Validators.required,Validators.email]],
    idFoyer:['',[Validators.required]],
  });

  updateUniversite(form: any){
    const formData = {
      ...this.frombuil.value,
    };    this.serviceUniv.updateUniversite(formData).subscribe(
      () => {

        alert('Mise à jour réussie');
        // Réinitialiser le formulaire ou effectuer toute autre action nécessaire
        this.frombuil.reset();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour :', error);
      }
    );
    this.updateDialogRef.close();
  }

  closeDialog(): void {
    this.updateDialogRef.close();
  }

  submitForm(formData: any): void {
    // console.log('Form Data:', formData);
    // Emit the form data when the form is submitted
    // this.addFormSubmit.emit(formData);
    // Close the dialog
    // formData.userImage = this.imageUrl;
    this.updateDialogRef.close(formData);
  }

}
