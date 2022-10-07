import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    template: `
        <div class="input-container">
            <h1 class="input-header"> Register </h1>
                <div class="input-body">
                    <form #registrationForm="ngForm" (ngSubmit)="onSubmit(registrationForm)">
                        <div class="form-group shorter-input-box">
                            <input type="email"
                            id="email"
                            class="form-control"
                            ngModel
                            name="email"
                            required
                            email
                            placeholder="Email"
                            />
                        </div>
                       <div class="form-group shorter-input-box">
                            <input type="password"
                            id="password"
                            class="form-control"
                            name="password"
                            type="password"
                            ngModel
                            minlength="6"
                            required
                            placeholder="Password"
                            />
                        </div>
                        <div class="text-center shorter-input-button">
                            <button
                                class="btn btn-primary btn-block"
                                type="submit"
                                [disabled]="!registrationForm.valid">
                                Register
                            </button>
                        </div>
                    </form>
                    <div class="text-center">
                        <h4 style="width: 100%; text-align: center;">
                            Already have an account? <br /> Click
                                <a (click)="onLoginClick()" style="cursor: pointer; color: #6b789a !important;">here</a>
                            to login.
                        </h4>
                    </div>
                </div>
            </div>
    `,
    styleUrls: ['login.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    public toastSubscription: Subscription;
    public errorSubscription: Subscription;
    public error: string;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public authService: AuthService,
        private _toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.authService.currentView.next('register');
        this.errorSubscription = this.authService.error.subscribe((error: string) => this.error = error);
        this.toastSubscription = this.authService.registerToast.subscribe((success: boolean) => {
            if (success) {
                this._toastrService.success('Registration succeeded');
                // TODO: await a sleep, then redirect?
            } else {
                this._toastrService.error(this.error, 'Registration failed');
            }
        });
    }

    public onLoginClick(): void {
        this.authService.currentView.next('login');
        this.router.navigate(['../login'], {relativeTo: this.activatedRoute});
    }

    public async onSubmit(form: NgForm): Promise<void> {
        const email = form.value.email;
        const password = form.value.password;

        console.log(form.value);
        await this.authService.registerUser(email, password);
        form.reset();
    }

    ngOnDestroy(): void {
        this.errorSubscription.unsubscribe();
        this.toastSubscription.unsubscribe();
    }
}
