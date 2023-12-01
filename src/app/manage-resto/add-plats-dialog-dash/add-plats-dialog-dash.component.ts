import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RestoServiceService} from "../resto-service.service";
import {Plat} from "../Model/Plat";

@Component({
  selector: 'app-add-plats-dialog-dash',
  templateUrl: './add-plats-dialog-dash.component.html',
  styleUrls: ['./add-plats-dialog-dash.component.scss']
})
export class AddPlatsDialogDashComponent {

  constructor(  private platService: RestoServiceService, // Assuming you have a PlatService
                private dialogRef: MatDialogRef<AddPlatsDialogDashComponent>,
                public addDialogRef: MatDialogRef<AddPlatsDialogDashComponent>,
              private restoService: RestoServiceService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    console.log('Restaurant ID:', this.data.restaurantId);
    console.log('Restaurant ID:', this.data?.restaurantId);
    console.log('Plat to add:', this.plat);
    // Other initialization code...
  }
  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg'; // To store the URL of the selected image
  @ViewChild('fileInput') fileInput: any;
  addedPlat:any;
  // @Output() addFormSubmit: EventEmitter<any> = new EventEmitter<any>();

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
  plat: Plat = {
    idPlat: 0, // Initialize with a default value or adjust accordingly
    nomPlat: '',
    description: '',
    prixPlat: 0,
    imagePlat: '',
    restaurant: {
      idRestaurant: 0, // Initialize with a default value or adjust accordingly
    },
  };

  imageFile: File | undefined;
  onImageFileSelected(event: any): void {
    this.imageFile = event.target.files[0];

  }
  submitForm(formData: any): void {
    this.plat.nomPlat = formData.nomPlat;
    this.plat.prixPlat = formData.prixPlat;
    this.plat.imagePlat = formData.imagePlat;
    this.plat.description = formData.description;
    // Ensure that the restaurant field is correctly populated in the plat object
    this.plat.restaurant.idRestaurant = this.data?.restaurantId;

    // Call your platService method to add the plat
    this.platService.addPlat(this.plat).subscribe(response => {
      this.addedPlat = response;
      console.log('Response after adding plat:', response);
      //window.location.reload();
      // Other handling code...

    }, error => {
      console.error('Error adding restaurant:', error);
      alert('Error adding restaurant. Check console for details.');
      // Handle the error as needed
    },()=>{
      this.restoService.uploadImagePlat(this.imageFile,this.addedPlat.idPlat).subscribe(
        {next:()=>{},
          error:(err)=>{console.log(err)}
        })
    }
  );
  }

  // console.log('Form Data:', formData);
  // Emit the form data when the form is submitted
  // this.addFormSubmit.emit(formData);
  // Close the dialog
  // formData.userImage = this.imageUrl;

}
