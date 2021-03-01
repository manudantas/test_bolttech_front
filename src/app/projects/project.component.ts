import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ProjectApi } from '../api/project.api';
import { Project } from './types/project';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {

    public projects: Project[];

    private subscriptions = new SubSink();
    
    constructor(private readonly formBuilder: FormBuilder, private readonly projectApi: ProjectApi) {}

    public ngOnInit(): void {
        this.getProjects();
    }

    public removeProjectFromList(project: Project): void {
        this.projects.splice(this.projects.indexOf(project), 1);
    }

    public addNewProject(project: Project): void {
        this.projects.push(project);
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public getProjects(): void {
        this.subscriptions.sink = this.projectApi.getAll().subscribe((projects) => {
            this.projects = projects;
        })
    }

}
