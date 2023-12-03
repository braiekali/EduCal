import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import {ActualiteService} from "../services/actualite.service";
import {UniversiteService} from "../services/universite.service";

@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.scss']
})
export class NewsUpdateComponent {
  idActualite: number;
  News:any;


  constructor(
    public updateDialogRef: MatDialogRef<NewsUpdateComponent>,private serviceNews:ActualiteService,private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.frombuil.patchValue({
      ...data.news,

    });
  }
  frombuil=this.fb.group({
    idActualite:['',[Validators.required]],
    titreActualite: ['', [Validators.required ]],
    dateActualite : ['', [Validators.required ]],
    description:['',[Validators.required]],

  });
  updateNews(form: any){
    const formData = {
      ...this.frombuil.value,
    };
    this.serviceNews.updateActualite(formData).subscribe(
      () => {
        // Successfully updated
        this.serviceNews.updateActualiteWithUniversite(this.data.id, formData.idActualite).subscribe(
          () => {
            // Successfully updated with universite
            alert('Mise à jour réussie');
            // Reset the form group (adjust the name based on your actual form group)
            this.frombuil.reset();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour avec universite :', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la mise à jour :', error);
      }
    );
    this.updateDialogRef.close();
  }
}
