import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    template: `
        <div class="input-container">
            <h1 class="input-header"> Login </h1>
            <div class="input-body">
                <form #registrationForm="ngForm" (ngSubmit)="onSubmit(registrationForm)">
                    <div class="form-group shorter-input-box">
                        <input type="text"
                            id="email"
                            class="form-control"
                            name="email"
                            ngModel
                            maxlength="12"
                            required
                            placeholder="Username"
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
                            Login
                        </button>
                    </div>
                </form>
                <div class="text-center">
                    <h4>
                        Don't have an account? <br /> Click
                        <a (click)="onRegisterClick()" class="register-button">here</a>
                        to register. <br />
                    </h4>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    public toastSubscription: Subscription;
    public errorSubscription: Subscription;
    private _email: string;
    public error: string;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public authService: AuthService,
        private _toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.authService.currentView.next('login');
        this.errorSubscription = this.authService.error.subscribe((error: string) => this.error = error);
        this.toastSubscription = this.authService.loginToast.subscribe((success: boolean) => {
            if (success) {
                this._toastrService.success(`Welcome, ${this._email}!`, 'Login succeeded');
                this.router.navigate(['security-analysis']);
            } else {
                this._toastrService.error(this.error, 'Login failed');
            }
        });
    }

    public onRegisterClick(): void {
        this.authService.currentView.next('register');
        this.router.navigate( ['../register'], {relativeTo: this.activatedRoute} );
    }

    public async onSubmit(form: NgForm): Promise<void> {
        const email = form.value.email;
        // TODO: Add email validation

        this._email = email;
        const password = form.value.password;
        await this.authService.login(email, password);
        form.reset();
    }

    ngOnDestroy(): void {
        this.errorSubscription.unsubscribe();
        this.toastSubscription.unsubscribe();
    }
}
