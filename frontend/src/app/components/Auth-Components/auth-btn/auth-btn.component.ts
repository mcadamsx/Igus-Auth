import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-btn',
  templateUrl: './auth-btn.component.html',
  styleUrl: './auth-btn.component.scss'
})
export class AuthBtnComponent {
  @ Input() title!: string;

}
