import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/AuthService/auth.service';
import { SubscriptionManager } from '../../core/subscriptionManager/subscriptionManager';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthInterface } from '../../shared/models/auth-interface';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../shared/services/TokenService/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  public isLoading: boolean = false;

  private subscriptionManager = new SubscriptionManager();
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private tokenService = inject(TokenService);

  public registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });



  public onRegister() {
    this.isLoading = true
    if (this.registerForm.valid) {
      this.subscriptionManager.add = this.authService.register(this.registerForm.value as AuthInterface).subscribe({
        next: (response) => {
          this.tokenService.storeToken(response.token)
          setTimeout(() => {
            this.isLoading = false
            this.toastr.success(response.message, 'Success', { closeButton: true })
            this.router.navigate(['/login']);
          }, 2000)
        },
        error: (error) => {
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
