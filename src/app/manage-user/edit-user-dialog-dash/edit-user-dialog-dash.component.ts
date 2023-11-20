import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
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
    idUser: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    cin: ['', [Validators.required, this.validateLength(8)]],
    phone: ['', [Validators.required, this.validateLength(8)]],
  });

  validateLength(expectedLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value as number;
      const stringValue = value != null ? value.toString() : '';

      return stringValue.length === expectedLength ? null : { invalidLength: true };
    };
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
