import {Component, Inject, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {RestoServiceService} from "../resto-service.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Restaurant} from "../Model/Restaurant";
import {Plat} from "../Model/Plat";

@Component({
  selector: 'app-update-plat-dash',
  templateUrl: './update-plat-dash.component.html',
  styleUrls: ['./update-plat-dash.component.scss']
})
export class UpdatePlatDashComponent {
  updateFormData: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private restoService: RestoServiceService,
    public updateDialogRef: MatDialogRef<UpdatePlatDashComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.frombuil.patchValue({
      nomPlat: data.nomPlat || '', // handle potential null or undefined values
      description: data.description || '',
      prixPlat: data.prixPlat || '',
      restaurant: data.restaurant || '',
    });
  }

  frombuil = this.fb.group({
    nomPlat: ['', [Validators.required]],
    description: ['', [Validators.required]],
    prixPlat: ['', [Validators.required]],
    restaurant: ['', [Validators.required]],
  });

  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg'; // To store the URL of the selected image
  @ViewChild('fileInput') fileInput: any;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Read the selected image file and update the preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  resetAvatarImage() {
    this.imageUrl = './assets/images/profile/user-1.jpg';
  }

  createPlatObject(): Plat {
    return {
      idPlat: this.data.idPlat,
      nomPlat: this.frombuil.value.nomPlat!,
      description: this.frombuil.value.description!,
      prixPlat: +this.frombuil.value.prixPlat! || 0,
      restaurant: {idRestaurant: +this.frombuil.value.restaurant! || 0},
    };
  }

  updatePlat(idPlat: number, updatedPlat: Plat): void {
    const formData: Plat = {
      idPlat: idPlat,
      nomPlat: this.frombuil.value.nomPlat!,
      description: this.frombuil.value.description!,
      prixPlat: +this.frombuil.value.prixPlat! || 0, // convert to number, handle potential empty string
      restaurant: {idRestaurant: +this.frombuil.value.restaurant! || 0}, // convert to number, handle potential empty string
    };

    this.restoService.updatePlat(idPlat, formData).subscribe(
      () => {
        alert('Mise à jour réussie');
        // Réinitialiser le formulaire ou effectuer toute autre action nécessaire
        this.frombuil.reset();
        this.updateDialogRef.close();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour :', error);
      }
    );
  }

  closeDialog(): void {
    this.updateDialogRef.close();
  }
}
