import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { User } from '../../../manage-user/model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    '../../../../assets/css/default.css',
    '../../../../assets/css/bootstrap.min.css',
    '../../../../assets/front/css/fontAwesome5Pro.css',
    '../../../../assets/css/style.css',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppSideRegisterComponent {

  registerForm: FormGroup;
  user: User = new User();
  formcaptcha: FormGroup;
  formSubmitted = false;
  formError = false;
  protected aFormGroup: FormGroup;
  protected siteKey: string = '6LeGchYpAAAAAK7W0Ed0vSwUH8C2QFr3otG_a4-7';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

      this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      agreeTerms: [false, Validators.requiredTrue],
      recaptcha: ['', Validators.required],

    });
  }

  get f() {
    return this.registerForm.controls;
  }

  submitForm() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      this.formError = true;
      return;
    }

    if (this.registerForm.valid) {
      const { firstName, lastName, email, cin, phone, password } = this.registerForm.value;
      const role = 'étudiant';

      this.authService
        .register(firstName, lastName, cin, phone, email, password, role)
        .subscribe(
          () => {
            console.log('Registration successful!');
          },
          (error) => {
            console.error('Registration failed:', error);
          }
        );

      Swal.fire({
        title: 'Félicitations !',
        text: 'Check your email and click on the link !',
        icon: 'success',
      });
    }
  }
}
