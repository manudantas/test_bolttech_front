import { Injectable } from '@angular/core';
import { LoginResponse, User } from './types/login-response';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userKey = 'user@key';

    private tokenKey = 'token@key';

    private _user: User;

    private _token: string;

    public get user(): User {
        if (!this._user) {
            this._user = JSON.parse(localStorage.getItem(this.userKey)) as User;
        }

        return this._user;
    }

    public get token(): string {
        if (!this._token) {
            this._token = localStorage.getItem(this.tokenKey);
        }

        return this._token;
    }

    public clearStorage(): void {
        localStorage.removeItem(this.userKey);
        localStorage.removeItem(this.tokenKey);

        this._user = undefined;
        this._token = undefined;
    }

    public storeUser(payload: LoginResponse): void {
        if (this.user || this.token) {
            this.clearStorage();
        }

        const { token, user } = payload;

        localStorage.setItem(this.userKey, JSON.stringify(user));
        localStorage.setItem(this.tokenKey, token);

        this._user = user;
        this._token = token;
    }

    public isAuthenticated(): boolean {
        const { token } = this;
        return !!token;
    }
}
