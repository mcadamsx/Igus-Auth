import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.scss'
})
export class AuthInputComponent {
  @ Input() inputType!: string;
  @ Input() FormControlName!: string;
  @ Input() placeholderText!: string;
  

}
