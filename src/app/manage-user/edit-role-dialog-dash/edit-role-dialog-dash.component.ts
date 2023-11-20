import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../model/role';
import { RoleService } from '../service/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-role-dialog-dash',
  templateUrl: './edit-role-dialog-dash.component.html',
  styleUrls: ['./edit-role-dialog-dash.component.scss']
})
export class EditRoleDialogDashComponent {
  idRole: number;
  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg';
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  constructor(
    public updateDialogRef: MatDialogRef<EditRoleDialogDashComponent>,private serviceRole:RoleService,private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.frombuil.patchValue({
      ...data,
    });
  }
  frombuil=this.fb.group({
    idRole:['',[Validators.required]],
    name:['',[Validators.required]],
   


  });

  updateRole(form: any) {
    // Vérifier si le champ du nom existe et n'est pas nul
    const nameControl = this.frombuil.get('name');
    if (nameControl && nameControl.value) {
      const formData = {
        ...this.frombuil.value,
      };
  
      this.serviceRole.updateRole(formData).subscribe(
        () => {
          // Réinitialiser le formulaire
          this.frombuil.reset();
  
          // Fermer la boîte de dialogue
          this.updateDialogRef.close();
  
          // Afficher l'alerte de mise à jour réussie uniquement si elle est réussie
          Swal.fire({
            title: 'Mise à jour réussie!',
            text: 'Votre rôle est mis à jour !',
            icon: 'success',
          });
        },
        (error) => {
          console.error('Erreur lors de la mise à jour :', error);
        }
      );
    } else {
      // Si le champ du nom est nul ou vide, afficher un message d'erreur ou prendre une autre action nécessaire
      console.error('Le nom est requis.');
    }
  }
  

  closeDialog(): void {
    this.updateDialogRef.close();
  }

  submitForm(formData: any): void {

    this.updateDialogRef.close(formData);
  }

}
