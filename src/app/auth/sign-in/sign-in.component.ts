import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {

    public signInForm: FormGroup;

    private subscriptions = new SubSink();
    
    constructor(private readonly formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        this.createForm();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onSubmit(): void {
        //call service
    }

    private createForm(): void {
        this.signInForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
        });
    }

}
