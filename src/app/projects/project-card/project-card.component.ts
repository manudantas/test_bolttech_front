import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectApi } from 'src/app/api/project.api';
import { SubSink } from 'subsink';
import { Project } from '../types/project';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit, OnDestroy {
    @Output()
    public removeProject = new EventEmitter<Project>();
    
    @Input()
    public project: Project;

    private subscriptions = new SubSink();
    
    constructor(private readonly formBuilder: FormBuilder, private readonly projectApi: ProjectApi) {}

    public ngOnInit(): void {
    //
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onRemoveProject(): void {
        this.subscriptions.sink = this.projectApi.remove(this.project._id).subscribe((response) => {
            console.log(response);
            this.removeProject.emit(response);
        });
    }
    

}
