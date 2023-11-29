import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'app/pages/authentication/auth.service';
import { environment } from 'app/environment/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: User;
  frombuil: FormGroup;
  formSubmitted = false;
  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg';
  imageFile: File;


  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private serviceUser: UserService,
    private authService: AuthService,
    public updateDialogRef: MatDialogRef<ProfileComponent>,
  ) {
    const storedUserProfile = localStorage.getItem('userProfile');
    this.userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : null;
  
    // Créer le formulaire réactif avec les champs nécessaires
    this.frombuil = this.fb.group({
      firstName: [this.userProfile ? this.userProfile.firstName : '', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: [this.userProfile ? this.userProfile.lastName : '', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: [{ value: this.userProfile ? this.userProfile.email : '', disabled: true }],
      cin: [{ value: this.userProfile ? this.userProfile.cin : '', disabled: true }],
      phone: [this.userProfile ? this.userProfile.phone : '', [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
    });
  
    // Mettez à jour l'URL de l'image si l'utilisateur a une image, sinon utilisez l'image par défaut
    if (data && data.imageUrl) {
      this.imageUrl = `${environment.url}/upload-directory/${data.imageUrl}`;
    } else {
      this.imageUrl = './assets/images/profile/user-1.jpg';
    }
  }

  ngOnInit() {
    // Vous pouvez ajouter des validations ou d'autres logiques initiales ici si nécessaire
  }

 

  closeDialog(): void {
    this.updateDialogRef.close();
  }

  submitForm(formData: any): void {
    this.updateDialogRef.close(formData);
  }
}
