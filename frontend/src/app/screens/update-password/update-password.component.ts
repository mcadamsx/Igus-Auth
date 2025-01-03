import { Component, inject } from '@angular/core';
import { SubscriptionManager } from '../../core/subscriptionManager/subscriptionManager';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { responseInterface, updatePasswordInterface } from '../../shared/models/auth-interface';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent {

  public isLoading: boolean = false;

  private subscriptionManager = new SubscriptionManager();

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router)

  public updatePasswordForm = this.fb.group({
    newpassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    resetToken: [localStorage.getItem('resetToken')]
  });

  public resetPassword() {
    this.isLoading = true
    this.updatePasswordForm.disable
    if (this.updatePasswordForm.valid) {
      this.subscriptionManager.add = this.authService.updatePassword(this.updatePasswordForm.value as updatePasswordInterface).subscribe({
        next: (response: responseInterface) => {
          setTimeout(() => {
            this.isLoading = false
            this.toastr.success(response.message, 'Success', { closeButton: true })
            this.router.navigate(["/login"])
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
