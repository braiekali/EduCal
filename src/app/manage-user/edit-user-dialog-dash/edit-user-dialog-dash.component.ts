import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user-dialog-dash',
  templateUrl: './edit-user-dialog-dash.component.html',
  styleUrls: ['./edit-user-dialog-dash.component.scss']
})
export class EditUserDialogDashComponent {
  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg';
  formSubmitted = false; // Ajout d'une variable pour suivre l'état de soumission du formulaire

  constructor(
    public updateDialogRef: MatDialogRef<EditUserDialogDashComponent>,
    private serviceUser: UserService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.frombuil.patchValue({
      ...(data || {}),
    });
  }

  frombuil = this.fb.group({
    idUser: [''],
    firstName: [''],
    email: [''],
    lastName: [''],
    cin: [''],
    phone: [''],
  });

  get form() {
    return this.frombuil.controls;
  }
  updateUser(form: FormGroup) {
    this.formSubmitted = true;

    if (form.valid) {
      const formData = {
        ...form.value,
      };

      this.serviceUser.updateUser(formData).subscribe(
        () => {
          form.reset();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour :', error);
        }
      );

      this.updateDialogRef.close();

      Swal.fire({
        title: 'Update',
        text: 'Votre utilisateur est mis à jour !',
        icon: 'success',
      });
    }
  }

  closeDialog(): void {
    this.updateDialogRef.close();
  }

  submitForm(formData: any): void {
    this.updateDialogRef.close(formData);
  }
}
