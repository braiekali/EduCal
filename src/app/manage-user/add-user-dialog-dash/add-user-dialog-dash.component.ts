import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { RoleService } from '../service/role.service';
import { User } from '../model/user';
import { Role } from '../model/role';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-dialog-dash',
  templateUrl: './add-user-dialog-dash.component.html',
  styleUrls: ['./add-user-dialog-dash.component.scss'],
})
export class AddUserDialogDashComponent {
  user: User = new User();
  allRoles: Role[] = [];
  selectedUser: number = 1;
  imageUrl: string | ArrayBuffer | null = './assets/images/profile/user-1.jpg';
  @ViewChild('fileInput') fileInput: any;
  selectedRole: Role;
  addUserForm: FormGroup;

  constructor(
    public addDialogRef: MatDialogRef<AddUserDialogDashComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.addUserForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      cin: ['', [Validators.required, this.validateLength(8)]],
      phone: ['', [Validators.required, this.validateLength(8)]],
      password: ['', Validators.required],
      // ... add other form controls as needed
    });
  }

  validateLength(expectedLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value as string;
      return value.length === expectedLength ? null : { invalidLength: true };
    };
  }

  formSubmitted = false;

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(
      (roles) => {
        this.allRoles = roles;
      },
      (error) => {
        console.error('Error retrieving roles:', error);
      }
    );
  }

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

  submitForm(): void {
    console.log('Form submitted:', this.addUserForm.value);

    if (!this.validateForm(this.addUserForm.value)) {
      console.log('Form validation failed');
      return;
    }

    const user = this.addUserForm.value;

    this.userService.addUser(user).subscribe(
      (response) => {
        console.log('User added successfully:', response);
        this.addDialogRef.close();
        Swal.fire({
          title: 'Ajout réussi!',
          text: 'Votre utilisateur a été ajouté avec succès !',
          icon: 'success',
        });
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }

  private validateForm(user: any): boolean {
    if (!user.lastName || !user.firstName || !user.email || !user.phone || !user.cin || !user.password) {
      console.log('All fields are required');
      return false;
    }
  
    if (user.phone.toString().length !== 8) {
      console.log('Phone number must be 8 digits long');
      return false;
    }
  
    if (user.cin.toString().length !== 8) {
      console.log('CIN must be 8 digits long');
      return false;
    }
  
    // Add more validation rules if needed...
  
    return true;
  }
  
}
