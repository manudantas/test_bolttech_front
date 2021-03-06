import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from 'src/app/api/auth.api';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {

    public signInForm: FormGroup;

    private subscriptions = new SubSink();
    
    constructor(private readonly formBuilder: FormBuilder, private readonly authApi: AuthApi, private readonly router: Router) {}

    public ngOnInit(): void {
        this.createForm();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onSubmit(): void {
        this.subscriptions.sink = this.authApi.signin(this.signInForm.value).subscribe((_response) => {
            void this.router.navigate(['home']);
        }, (error) => {
            alert("Invalid Credentials");
        });
    }

    private createForm(): void {
        this.signInForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
        });
    }

}
