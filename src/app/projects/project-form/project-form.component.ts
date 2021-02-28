import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectApi } from 'src/app/api/project.api';
import { SubSink } from 'subsink';
import { Project } from '../types/project';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
    @Output()
    public newProject = new EventEmitter<Project>();

    public projectForm: FormGroup;

    private subscriptions = new SubSink();
    
    constructor(private readonly formBuilder: FormBuilder, private readonly projectApi: ProjectApi) {}

    public ngOnInit(): void {
        this.createForm();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onSubmit(): void {
        this.subscriptions.sink = this.projectApi.create(this.projectForm.value).subscribe((response) => {
            this.newProject.emit(response);
        });
    }

    private createForm(): void {
        this.projectForm = this.formBuilder.group({
            title: ['', [Validators.email, Validators.required]],
        });
    }


}
