import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApi } from 'src/app/api/user.api';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {

    public signUpForm: FormGroup;

    private subscriptions = new SubSink();
    
    constructor(private readonly formBuilder: FormBuilder, private readonly userApi: UserApi, private readonly router: Router) {}

    public ngOnInit(): void {
        this.createForm();
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public onSubmit(): void {
        this.subscriptions.sink = this.userApi.signup(this.signUpForm.value).subscribe((_response) => {
            void this.router.navigate(['home']);
        });
    }

    private createForm(): void {
        this.signUpForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            name: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

}
