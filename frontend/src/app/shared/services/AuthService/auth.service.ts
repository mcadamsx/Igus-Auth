import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthInterface, responseInterface, updatePasswordInterface } from '../../models/auth-interface';
import { env } from '../../../core/env/env';
import { TokenService } from '../TokenService/token.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly baseUrl: string = env.BACKENDURL
	private readonly http = inject(HttpClient)
	private tokenService = inject(TokenService)

	public login(loginData: AuthInterface): Observable<AuthInterface>{
		return this.http.post<AuthInterface>(
			`${this.baseUrl}/auth/login`,
			loginData,
		);
	}

	public register(registerData: AuthInterface):Observable<AuthInterface> {
		return this.http.post<AuthInterface>(
			`${this.baseUrl}/auth/register`,
			registerData,
		);
	}
	public resetPassword(userData: AuthInterface):Observable<responseInterface> {
		return this.http.post<responseInterface>(
			`${this.baseUrl}/auth/reset-password`,
			userData,
		);
	}
	public updatePassword(userData: updatePasswordInterface):Observable<responseInterface> {
		return this.http.post<responseInterface>(
			`${this.baseUrl}/auth/update-password`,
			userData,
		);
	}

	public isLoggedIn(): boolean {
		return !!this.tokenService.getToken();;
	}
}
