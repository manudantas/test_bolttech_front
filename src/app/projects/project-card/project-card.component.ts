import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectApi } from 'src/app/api/project.api';
import { SubSink } from 'subsink';
import { Project, Task } from '../types/project';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit, OnDestroy {
    @Output()
    public removeProject = new EventEmitter<Project>();

    @Output()
    public addTask = new EventEmitter<Task>();

    @Output()
    public changeTask = new EventEmitter<Task>();
    
    @Input()
    public project: Project;

    public isEditing = false;

    public projectCardForm: FormGroup;

    public taskForm: FormGroup;

    private subscriptions = new SubSink();
    
    constructor(private readonly formBuilder: FormBuilder, private readonly projectApi: ProjectApi) {}

    public ngOnInit(): void {
        this.createTitleForm();
        this.createTaskForm();
    }

    public changeEdit(): void {
        this.isEditing = !this.isEditing;
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public changeTaskFromCard(): void {
        this.changeTask.emit();
    }

    public onRemoveProject(): void {
        this.subscriptions.sink = this.projectApi.remove(this.project._id).subscribe((response) => {
            this.removeProject.emit(response);
        });
    }

    public onSubmit(): void {
        this.subscriptions.sink = this.projectApi.update(this.project._id, this.projectCardForm.value).subscribe((response) => {
            this.project.title = response.title;
            this.isEditing = false;
        });
    }

    
    public onSubmitTask(): void {
        this.subscriptions.sink = this.projectApi.addTask(this.project._id, this.taskForm.value).subscribe((response) => {
            this.addTask.emit(response);
        });
    }

    private createTitleForm(): void {
        this.projectCardForm = this.formBuilder.group({
            title: ['', [Validators.required]],
        });
    }

    private createTaskForm(): void {
        this.taskForm = this.formBuilder.group({
            description: ['', [Validators.required]],
        });
    }

}
