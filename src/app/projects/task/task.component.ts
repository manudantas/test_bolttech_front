import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { TaskApi } from 'src/app/api/task.api';
import { SubSink } from 'subsink';
import { Task } from '../types/project';
@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
    @Output()
    public changeTask = new EventEmitter<Task>();

    @Input()
    public task: Task;

    public taskCompletedForm: FormGroup;

    public editTaskForm: FormGroup;

    public isEditing = false;

    private subscriptions = new SubSink();
    
    constructor(private readonly formBuilder: FormBuilder, private readonly taskApi: TaskApi) {}

    public ngOnInit(): void {
        this.createTaskCompletedForm();
        this.createEditTaskForm();

        if (this.task.isCompleted) {
            this.taskCompletedForm.patchValue({isCompleted: true});
            this.taskCompletedForm.get('isCompleted').disable();
        }

        this.subscriptions.sink = this.taskCompletedForm.valueChanges.pipe(
            switchMap((value) => this.taskApi.update(this.task._id, value)),
        ).subscribe((response) => {
            this.taskCompletedForm.get('isCompleted').disable({emitEvent: false});
            this.changeTask.emit();
        })
    }

    public onRemoveTask(): void {
        if (!this.task.isCompleted) {
            this.subscriptions.sink = this.taskApi.remove(this.task._id).subscribe((response) => {
                this.changeTask.emit();
            })
        }
    }

    public onSubmit(): void {
        this.subscriptions.sink = this.taskApi.update(this.task._id, this.editTaskForm.value).subscribe((_response) => {
            this.isEditing = false;
            this.changeTask.emit();
        })
    }

    public changeEdit(): void {
        if (!this.task.isCompleted) {
            this.isEditing = !this.isEditing;
        }
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private createTaskCompletedForm(): void {
        this.taskCompletedForm = this.formBuilder.group({
            isCompleted: ['', [Validators.required]],
        });
    }

    private createEditTaskForm(): void {
        this.editTaskForm = this.formBuilder.group({
            description: ['', [Validators.required]],
        });
    }
}
