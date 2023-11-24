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
      lastName: [''],
      firstName: [''],
      email: [''],
      cin: [''],
      phone: [''],
      password: [''],
      // ... add other form controls as needed
    });
  }
  get form() {
    return this.addUserForm.controls;
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

  submitForm(): void {
    this.formSubmitted = true;


    if (this.addUserForm.invalid) {

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
        // Check if the error is a 200 status (OK)
        if (error.status === 200) {
          console.log('yooo..');
          this.addDialogRef.close();
          Swal.fire({
            title: 'felicitation!',
            text: 'USER ADDED.',
            icon: 'success',
          });
        
        } else {
          Swal.fire({
            title: 'OOPS!',
            text: 'CHECK YOUR MAIL AND CIN ,THEY SHOULD BE UNIQUE.',
            icon: 'error',
          });
        }
      }
    );
  }
      }
    
