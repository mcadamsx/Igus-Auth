import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  Router,
} from '@angular/router';
import { SubscriptionManager } from '../../core/subscriptionManager/subscriptionManager';
import { AuthService } from '../../shared/services/AuthService/auth.service';
import { AuthInterface, responseInterface } from '../../shared/models/auth-interface';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../shared/services/TokenService/token.service';


@Component({
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  public isLoading: boolean = false;

  private subscriptionManager = new SubscriptionManager();
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private tokenService = inject(TokenService);

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });

  public onLogin() {
    this.isLoading = true
    this.loginForm.disable
    if (this.loginForm.valid) {
      this.subscriptionManager.add = this.authService.login(this.loginForm.value as AuthInterface).subscribe({
        next: (response:AuthInterface) => {
          this.tokenService.storeToken(response.token)  
          setTimeout(() => {
            this.isLoading = false
            this.toastr.success(response.message, 'Success', { closeButton: true })
          }, 2000)
         
        },
        error: (error: responseInterface) => {
          setTimeout(() => {
            this.isLoading = false
            this.toastr.error(error.error.message, 'Error', { closeButton: true })
          }, 2000)
         
        },
      });
    } else {
      this.isLoading = false
      this.toastr.error('Please all fields are required  .', 'Error', { closeButton: true })
    }
  }
}