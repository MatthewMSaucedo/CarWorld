import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppEndpointService } from '../server-communication/app-endpoint.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public currentView = new Subject<string>();
    public loginToast = new Subject<boolean>();
    public registerToast = new Subject<boolean>();
    public error = new Subject<string>();
    public isLoggedIn = new Subject<boolean>();
    private _authToken: string;
    public loggedInUser: string;

    constructor(public endpointService: AppEndpointService) { }

    public getToken(): string {
        return this._authToken;
    }

    public async registerUser(email: string, password: string): Promise<void> {
        try {
            const response = await this.endpointService.register({email, password});
            this.registerToast.next(true);
        } catch (error) {
            this.error.next(error.error.error.message);
            this.registerToast.next(false);
        }
    }

    public async login(email: string, password: string): Promise<void> {
        try {
            const response = await this.endpointService.login({email, password});
            this._authToken = response.token;
            this.loginToast.next(true);
            this.isLoggedIn.next(true);
            this.loggedInUser = email;
        } catch (error) {
            this.error.next(error.error.message);
            this.loginToast.next(false);
        }
    }
}
