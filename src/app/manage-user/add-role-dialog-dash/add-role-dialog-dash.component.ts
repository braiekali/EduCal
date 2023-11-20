
import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { RoleService } from '../service/role.service';
import { Role } from "../model/role";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-role-dialog-dash',
  templateUrl: './add-role-dialog-dash.component.html',
  styleUrls: ['./add-role-dialog-dash.component.scss']
})
export class AddRoleDialogDashComponent {

  role: Role = new Role();
  allRoles: Role[] = [];  // Liste de tous les rôles disponibles
  selectedRole: number = 1; // Initialisez avec la valeur par défaut si nécessaire
  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg';

  @ViewChild('fileInput') fileInput: any;

  constructor(public addDialogRef: MatDialogRef<AddRoleDialogDashComponent>, private userService: UserService , private roleService: RoleService) {}
  formSubmitted = false;

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

  triggerFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  resetAvatarImage(): void {
    this.imageUrl = './assets/images/profile/user-1.jpg';
  }

  closeDialog(): void {
    this.addDialogRef.close();
  }

  submitForm(role: any): void {
    console.log('Form submitted:', role);
  
    if (!this.validateForm(role)) {
      console.log('Form validation failed');
      return;
    }
  
  
    this.roleService.addRole(role).subscribe(
      (response) => {
        console.log('Role added successfully:', response);
        this.addDialogRef.close();
        Swal.fire({
          title: 'Ajout réussi!',
          text: 'Votre rôle est ajoute avec succes !',
          icon: 'success',
        });
      },
      (error) => {
        console.error('Error adding user:', error);
        // Handle errors here, for example, display a message to the user
      }
    );
  }
  
  private validateForm(role: any): boolean {
    if (!role.name) {
      console.log('All fields are required');
      return false;
    }
  
    // Add more validation rules if needed...
  
    return true;
  }
}


