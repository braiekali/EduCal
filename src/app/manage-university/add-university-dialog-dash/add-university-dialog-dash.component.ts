import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Universite } from '../models/Universite';
import { UniversiteService } from '../services/universite.service';
import { Foyer } from '../models/Foyer';

@Component({
  selector: 'app-add-university-dialog-dash',
  templateUrl: './add-university-dialog-dash.component.html',
  styleUrls: ['./add-university-dialog-dash.component.scss'],
})
export class AddUniversityDialogDashComponent implements OnInit {
  foyers: Foyer[] = [];
  image: string | ArrayBuffer | null = './assets/images/profile/notfound.jpg';
  @ViewChild('fileInput') fileInput: any;
  imageFile: File;
universites:any;
  constructor(
    public addDialogRef: MatDialogRef<AddUniversityDialogDashComponent>,
    private serviceUniv: UniversiteService,
    private fb: FormBuilder, private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.serviceUniv.getUniversites().subscribe(
      (data)=>{
this.universites=data;
      }
    )
    this.serviceUniv.getFoyers().subscribe(
      (data: any) => {
        if (this.universites.foyers==null){
          this.foyers = data;
          console.log('Foyers:', this.foyers);
        }

      },
      (error: any) => {
        console.error('Error fetching foyers:', error);
      }
    );
  }

  frombuil = this.fb.group({
    nomUniversite: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    adresseUniversite: ['', [Validators.required]],
    ville: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    descriptionUniversite: ['', [Validators.required]],
    telUniversite: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    emailUinversite: ['', [Validators.required, Validators.email]],
    idFoyer: ['', [Validators.required]],
    image: [''],
  });


  addUniversiteWithFoyer(frombuil: any) {
    const data = this.frombuil.value;
    const idFoyer = data.idFoyer;

    this.serviceUniv.addUniversiteWithFoyer(data, idFoyer, this.imageFile).subscribe(
      () => {
        console.log('Data:', data, 'Id:', idFoyer, this.imageFile);
        alert('Added Successfully');
        this.frombuil.reset();
      }
    );

    this.addDialogRef.close();
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(this.imageFile);
  }
  resetAvatarImage() {
    this.image = './assets/images/profile/notfound.jpg';
  }

  selectImage(): void {
    this.fileInput.nativeElement.click();
  }


  closeDialog(): void {
    this.addDialogRef.close();
  }

  submitForm(formData: any): void {
    this.addDialogRef.close(formData);
  }
}
