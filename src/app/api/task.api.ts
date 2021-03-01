import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Task } from '../projects/types/project';
import { RequestApi } from './request.api';

@Injectable({ providedIn: 'root' })
export class TaskApi extends RequestApi {
    private endpoint = 'task';

    constructor(protected http: HttpClient, protected readonly authService: AuthService) {
        super(http, authService);
    }

    public update(id: string, task: Task): Observable<Task> {
        return this.put<Task, Task>(`${this.endpoint}/${id}`, task);
    }

    public remove(id: string): Observable<Task> {
        return this.delete<Task>(`${this.endpoint}/${id}`);
    }
    

}
