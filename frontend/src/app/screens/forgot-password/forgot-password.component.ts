import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SubscriptionManager } from '../../core/subscriptionManager/subscriptionManager';
import { AuthService } from '../../shared/services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AuthInterface, responseInterface } from '../../shared/models/auth-interface';
import { Router } from '@angular/router';
import { TokenService } from '../../shared/services/TokenService/token.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  public isLoading: boolean = false;
  private subscriptionManager = new SubscriptionManager();

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private toastr = inject(ToastrService);
  private router = inject(Router)

  public forgotPasswordfrom = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  public resetPassword() {
    this.isLoading = true
    this.forgotPasswordfrom.disable
    if (this.forgotPasswordfrom.valid) {
      this.subscriptionManager.add = this.authService.resetPassword(this.forgotPasswordfrom.value as AuthInterface).subscribe({
        next: (response: responseInterface) => {
          this.tokenService.storeresetToken(response.resetToken)
          setTimeout(() => {
            this.isLoading = false
            this.toastr.success(response.message, 'Success', { closeButton: true })
            this.router.navigate(["/update-password"])
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
