import { Injectable } from '@angular/core';
import { env } from '../../../core/env/env';

@Injectable({
	providedIn: 'root',
})
export class TokenService {

	storeToken(token: string) {
		localStorage.setItem(env.token, token);
	}
	getToken(): string | null {
		return localStorage.getItem(env.token);
	}
	removeToken() {
		localStorage.removeItem(env.token);
	}
}
