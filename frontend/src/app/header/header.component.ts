import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authorization/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isLoggedIn = false;
    authSubscription: Subscription;

    constructor(public authService: AuthService) { }

    ngOnInit() {
        this.authSubscription = this.authService.isLoggedIn.subscribe((loginStatus: boolean) => {
            this.isLoggedIn = loginStatus;
        });
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

}
