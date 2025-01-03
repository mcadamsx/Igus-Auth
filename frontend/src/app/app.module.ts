import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
} from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthBtnComponent } from './components/Auth-Components/auth-btn/auth-btn.component';
import { AuthInputComponent } from './components/Auth-Components/auth-input/auth-input.component';
import { AuthSideImageComponent } from './components/Auth-Components/auth-side-image/auth-side-image.component';
import { SpinnerComponentComponent } from './components/spinner-component/spinner-component.component';
import { ForgotPasswordComponent } from './screens/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './screens/update-password/update-password.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, AuthBtnComponent, AuthInputComponent, AuthSideImageComponent, SpinnerComponentComponent, ForgotPasswordComponent, UpdatePasswordComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    RouterLink,
    
],
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    provideAnimations(), provideToastr()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
