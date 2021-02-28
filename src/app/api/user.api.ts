import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoginResponse } from '../auth/types/login-response';
import { SignupRequest } from '../auth/types/signup-request';
import { RequestApi } from './request.api';

@Injectable({ providedIn: 'root' })
export class UserApi extends RequestApi {
    private endpoint = 'user';

    constructor(protected http: HttpClient, protected authService: AuthService) {
        super(http, authService);
    }

    public signup(payload: SignupRequest): Observable<LoginResponse> {
        return this.post<SignupRequest, LoginResponse>(`${this.endpoint}`, payload).pipe(
            tap((response) => this.authService.storeUser(response)),
        );
    };

}
