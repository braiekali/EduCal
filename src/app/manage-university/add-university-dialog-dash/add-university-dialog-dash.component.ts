import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Universite} from "../models/Universite";
import {UniversiteService} from "../services/universite.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Foyer} from "../models/Foyer";


@Component({
  selector: 'app-add-university-dialog-dash',
  templateUrl: './add-university-dialog-dash.component.html',
  styleUrls: ['./add-university-dialog-dash.component.scss'],
})
export class AddUniversityDialogDashComponent implements OnInit{
  foyers: Foyer[] = [];
  constructor(
    public addDialogRef: MatDialogRef<AddUniversityDialogDashComponent>,private serviceUniv:UniversiteService,private fb:FormBuilder
  ) {}
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
    nomUniversite: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    adresseUniversite:['',[Validators.required]],
    ville:['',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    descriptionUniversite:['',[Validators.required]],
    telUniversite: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    emailUinversite:['', [Validators.required,Validators.email]],
    idFoyer:['',[Validators.required]],
  })
  addUniversiteWithFoyer(frombuil:any) {
    const Data = this.frombuil.value;
     let id = this.frombuil.value.idFoyer

    this.serviceUniv.addUniversiteWithFoyer(Data,id).subscribe(
      () => {
        console.log("thyyyyyyyyyyyyyyyyy",Data,id);
        alert('Added Successfully');
        this.frombuil.reset();
      }
    );
    this.addDialogRef.close(frombuil);

  }


  //imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg'; // To store the URL of the selected image
  //@ViewChild('fileInput') fileInput: any;
  // @Output() addFormSubmit: EventEmitter<any> = new EventEmitter<any>();

  /**onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Read the selected image file and update the preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }*/



  /**triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }*/

  //resetAvatarImage() {
    //this.imageUrl = './assets/images/profile/user-1.jpg';
  //}

  closeDialog(): void {
    this.addDialogRef.close();
  }

  submitForm(formData: any): void {
    // console.log('Form Data:', formData);
    // Emit the form data when the form is submitted
    // this.addFormSubmit.emit(formData);
    // Close the dialog
    // formData.userImage = this.imageUrl;
    this.addDialogRef.close(formData);
  }



}
