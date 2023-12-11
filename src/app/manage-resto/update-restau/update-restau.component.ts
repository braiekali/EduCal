import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {RestoServiceService} from "../resto-service.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {Restaurant} from "../Model/Restaurant";
import {HttpHeaders} from "@angular/common/http";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-update-restau',
  templateUrl: './update-restau.component.html',
  styleUrls: ['./update-restau.component.scss']
})
export class UpdateRestauComponent {
  restoForm: any;


  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg';
  formSubmitted = false; // Ajout d'une variable pour suivre l'état de soumission du formulaire
  imageFile: File;

  constructor(private route: ActivatedRoute, private fb: FormBuilder ,private restoService: RestoServiceService,    public updateDialogRef:  MatDialogRef<UpdateRestauComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {data.dateFermeture = new Date(data.dateFermeture).toISOString().split('T')[0];
    data.dateOuverture = new Date(data.dateOuverture).toISOString().split('T')[0];
    this.frombuil.patchValue({

      ...(data || {})


    });
    if (data && data.imageUrl) {
      this.imageUrl = `http://localhost:8082/upload-directory/${data.imageUrl}`;
    } else {
      this.imageUrl = './assets/images/profile/user-1.jpg';
    }
  }
  frombuil=this.fb.group({
    idRestaurant:[''],
    nomRestaurant:[''],
    dateOuverture:[''],
    dateFermeture:[''],
    imageRestaurant:['']


  });
 //imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg'; // To store the URL of the selected image
  @ViewChild('fileInput') fileInput: any;

  // @Output() addFormSubmit: EventEmitter<any> = new EventEmitter<any>();

  //Trying to work with FormBuilder
  get form() {
    return this.frombuil.controls;
  }

  onFileSelected(event: any) {
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


  addedResto:any;


  submitForm(formData: FormGroup): void {
    if (formData.valid) {
      // Remove the userImage property if it exists or set it to null
      delete formData.value.userImage;

      // Send the data to the server for restaurant update
      this.restoService.updateRestaurant2(formData.value).subscribe(
        (res) => {
          alert('Success! Restaurant added.');
          this.addedResto = res;

          // You might want to close the dialog here if needed
          this.closeDialog();

          // Check if addedResto is available with idRestaurant
          if (this.addedResto && this.addedResto.idRestaurant) {
            // If so, upload the image using the obtained idRestaurant
            this.restoService.uploadImage(this.imageFile, this.addedResto.idRestaurant).subscribe(
              {
                next: () => {},
                error: (err) => {
                  console.log(err);
                },
              }
            );
          } else {
            console.error('Error: addedResto is null or does not have idRestaurant property.');
          }
        },
        (error) => {
          console.error('Error adding restaurant:', error.message || error.statusText || error);
          alert('Error adding restaurant. Check console for details.');
          // Handle the error as needed
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }


  closeDialog(): void {
    this.updateDialogRef.close();
  }



  selectImage(): void {
    this.fileInput.nativeElement.click();
  }


  private setDefaultImageUrl() {
    this.imageUrl = this.data && this.data.imageUrl
      ? `http://localhost:8082/upload-directory/${this.data.imageUrl}`
      : './assets/images/profile/user-1.jpg';
  }

  resetImage(): void {
    this.setDefaultImageUrl();

    if (this.fileInput) {
      this.fileInput.nativeElement.value = null;
    }

    this.imageFile ;
  }

}



