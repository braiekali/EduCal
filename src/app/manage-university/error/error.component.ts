import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit{
  @Input()erreur:any ;
  ngOnInit(){
    console.log(this.erreur)
  }
  getErrorMessage() {
    if (this.erreur.errors) {
      if (this.erreur.errors.required) {
        return 'Le champ est obligatoire.';
      }
      if (this.erreur.errors.email) {
        return 'Le champ est de type email.';
      }
      if (this.erreur.errors.pattern) {
        if (this.erreur.errors.pattern.requiredPattern === '/^[a-zA-Z]+$/') {
          return 'Le champ doit contenir uniquement des lettres.';
        } else if (this.erreur.errors.pattern.requiredPattern === '/^[0-9]{8}$/') {
          return 'Le champ doit contenir exactement 8 chiffres.';
        }

      }
    }
    return 'Erreur inconnue.';
  }
}
