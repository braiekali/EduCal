import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UniversiteService} from "../services/universite.service";
import {Actualite} from "../models/Actualite";
import {ActualiteService} from "../services/actualite.service";

@Component({
  selector: 'app-add-news-dialog-dash',
  templateUrl: './add-news-dialog-dash.component.html',
  styleUrls: ['./add-news-dialog-dash.component.scss'],
})
export class AddNewsDialogDashComponent {
  selectedDate: any=Date.now();
   dateObject = new Date(this.selectedDate);


  actualite=new Actualite();
  constructor(public addDialogRef: MatDialogRef<AddNewsDialogDashComponent>,private serviceAct:ActualiteService,@Inject(MAT_DIALOG_DATA) public data: any)  {
  //console.log("hhhhhhhhhh",this.data.idUniversite);
}
 // imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg'; // To store the URL of the selected image
  //@ViewChild('fileInput') fileInput: any;
  // @Output() addFormSubmit: EventEmitter<any> = new EventEmitter<any>();

  addActualite(Data:any){
    Data.dateActualite=this.dateObject;
    console.log(Data,this.data.idUniversite);
    this.serviceAct.affecterUniversiteAActualite(this.data.idUniversite,Data).subscribe(
      () => {
        console.log(Data,this.data.idUniversite);
        alert('Added Successfully');
        //this.frombuil.reset();
      }
    );
    this.addDialogRef.close(Data);
  }





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

  protected readonly Actualite = Actualite;
}
