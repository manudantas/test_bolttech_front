import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoginRequest } from '../auth/types/login-request';
import { LoginResponse } from '../auth/types/login-response';
import { RequestApi } from './request.api';

@Injectable({ providedIn: 'root' })
export class AuthApi extends RequestApi {
    private endpoint = 'auth';

    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    public signin(payload: LoginRequest): Observable<LoginResponse> {
        return this.post<LoginRequest, LoginResponse>(`${this.endpoint}/signin`, payload).pipe(
            tap((response) => this.authService.storeUser(response)),
        );
    };

}
