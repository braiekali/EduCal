import {Component, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {RestoServiceService} from "../resto-service.service";

import {formatDate} from "@angular/common";
import {Restaurant} from "../Model/Restaurant";

@Component({
  selector: 'app-add-resto-dialog-dash',
  templateUrl: './add-resto-dialog-dash.component.html',
  styleUrls: ['./add-resto-dialog-dash.component.scss']
})
export class AddRestoDialogDashComponent {
  constructor(
    public addDialogRef: MatDialogRef<AddRestoDialogDashComponent>,
  private restoService: RestoServiceService

) {}

  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg'; // To store the URL of the selected image
  @ViewChild('fileInput') fileInput: any;
  // @Output() addFormSubmit: EventEmitter<any> = new EventEmitter<any>();
  imageRestaurant: File;
  addedResto:any;

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

  closeDialog(): void {
    this.addDialogRef.close();
  }

  imageFile: File | undefined;
  onImageFileSelected(event: any): void {
    this.imageFile = event.target.files[0];

  }

  submitForm(formData: any): void {
    // Format the date fields before sending the request
    formData.dateOuverture = formData.dateOuverture.toISOString();
    formData.dateFermeture = formData.dateFermeture.toISOString();

    // Remove the userImage property if it exists or set it to null
    delete formData.userImage;

    // Send the formatted data to the server
    this.restoService.addRestaurant(formData).subscribe(
      (res) => {
        alert('Success! Restaurant added.');
        this.addedResto = res;
        // You might want to close the dialog here if needed
        this.closeDialog();

      },
      error => {
        console.error('Error adding restaurant:', error);
        alert('Error adding restaurant. Check console for details.');
        // Handle the error as needed
      },()=>{
        this.restoService.uploadImage(this.imageFile,this.addedResto.idRestaurant).subscribe(
          {next:()=>{},
            error:(err)=>{console.log(err)}
        })
      }
    );
  }



/*
  onImageFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
    if (this.imageFile) {
      // Read the selected image file and update the preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }*/




}
