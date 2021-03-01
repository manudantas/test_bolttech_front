import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Project, Task } from '../projects/types/project';
import { RequestApi } from './request.api';

@Injectable({ providedIn: 'root' })
export class ProjectApi extends RequestApi {
    private endpoint = 'project';

    constructor(protected http: HttpClient, protected readonly authService: AuthService) {
        super(http, authService);
    }

    public create(project: Project): Observable<Project> {
        return this.post<Project, Project>(`${this.endpoint}`, project);
    }

    public getAll(): Observable<Project[]> {
        return this.get<Project>(`${this.endpoint}`);
    }

    public update(id: string, project: Project): Observable<Project> {
        return this.put<Project, Project>(`${this.endpoint}/${id}`, project);
    }

    public remove(id: string): Observable<Project> {
        return this.delete<Project>(`${this.endpoint}/${id}`);
    }

    public addTask(id: string, task: Task): Observable<Task> {
        return this.post<Task, Task>(`${this.endpoint}/task/${id}`, task);
    }
    

}
