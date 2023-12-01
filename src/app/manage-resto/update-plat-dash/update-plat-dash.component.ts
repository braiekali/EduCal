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
  addedResto:any;
  imageFile: File;
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
      imagePlat: data.imagePlat || '',
      restaurant: data.restaurant || '',
    });
    if (data && data.imageUrl) {
      this.imageUrl = `http://localhost:8082/upload-directory/${data.imageUrl}`;
    } else {
      this.imageUrl = './assets/images/profile/user-1.jpg';
    }
  }

  frombuil = this.fb.group({
    nomPlat: ['', [Validators.required]],
    description: ['', [Validators.required]],
    prixPlat: ['', [Validators.required]],
    imagePlat: ['', [Validators.required]],
    restaurant: ['', [Validators.required]],
  });

  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg'; // To store the URL of the selected image
  @ViewChild('fileInput') fileInput: any;
  get form() {
    return this.frombuil.controls;
  }
  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result;

    };
    reader.readAsDataURL(this.imageFile);

  }
  onImageFileSelected(event: any): void {
    this.imageFile = event.target.files[0];

  }


  createPlatObject(): Plat {
    const formValue = this.frombuil.value;

    const platObject: Plat = {
      idPlat: this.data.idPlat,
      nomPlat: formValue.nomPlat!,
      description: formValue.description!,
      prixPlat: +formValue.prixPlat! || 0,
      imagePlat: formValue.imagePlat || '',
      restaurant: { idRestaurant: +formValue.restaurant! || 0 },
    };

    return platObject;
  }

  updatePlat(idPlat: number,  updatedPlat: Plat): void {
    const formData: Plat = {
      idPlat: idPlat,
      nomPlat: this.frombuil.value.nomPlat!,
      description: this.frombuil.value.description!,
      prixPlat: +this.frombuil.value.prixPlat! || 0,
      imagePlat: this.frombuil.value.imagePlat || '',
      restaurant: { idRestaurant: +this.frombuil.value.restaurant! || 0 },
    };

    this.restoService.updatePlat(idPlat, formData).subscribe(
      (res) => {
        alert('Mise à jour réussie');
        // Réinitialiser le formulaire ou effectuer toute autre action nécessaire
        this.frombuil.reset();
        this.updateDialogRef.close();
        this.uploadImage(idPlat); // Move the image upload logic here
      },
      (error) => {
        console.error('Erreur lors de la mise à jour :', error);
      }
    );
  }

  uploadImage(idPlat: number): void {
    this.restoService.uploadImagePlat(this.imageFile, idPlat).subscribe(
      {
        next: () => {
          // Handle successful image upload if needed
        },
        error: (err) => {
          console.log(err);
        },
      }
    );
  }


  closeDialog(): void {
    this.updateDialogRef.close();
  }
}
