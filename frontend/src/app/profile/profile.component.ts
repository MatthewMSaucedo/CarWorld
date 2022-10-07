import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './profile.service';

@Component({
    selector: 'app-profile',
    template: `
        <div *ngIf="!pageIsLoading" class="container profile-body">
            <div class="profile-heading">
                {{email}}'s Profile
            </div>
            <div class="profile-row">
                <div class="profile-component">
                    <div class="portfolio">
                        <div class="profile-component-header">
                            <span style="font-size: 6rem; border-bottom: 2px solid black;">Watchlist</span>
                        </div>
                        <div *ngFor="let item of watchlist;" class="watchlist-item">
                            <div class="ticker-name">{{item.ticker}}</div>
                            <div>Current Price: {{item.currentPrice.toFixed(2)}}</div>
                            <div>Original Price: {{item.priceEntered.toFixed(2)}}</div>
                            <div>Date Added: {{item.dateAdded.slice(0,10)}}</div>
                            <a (click)="removeTickerFromWatchlist(item.ticker)">Remove from watchlist</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-row">
                <div>
                    <button
                        (click)="handleLogoutClick()"
                        class="btn btn-danger">Logout
                    </button>
                </div>
            </div>
        </div>
        <div *ngIf="pageIsLoading" class="center-spinner">
            <div class="lds-dual-ring lds-margin-top"></div>
        </div>
    `,
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public pageIsLoading: boolean;
    public watchlist;
    public email;

    constructor(
        public router: Router,
        public authService: AuthService,
        public profileService: ProfileService,
        private _toastrService: ToastrService
    ) { }

    async ngOnInit() {
        this.email = this.authService.loggedInUser;
        this.pageIsLoading = true;
        this.watchlist = await this.profileService.listWatchlist();
        this.pageIsLoading = false;
        console.log(this.watchlist[0]);
    }

    public handleLogoutClick(): void {
        this.authService.isLoggedIn.next(false);
        this._toastrService.success('Logout successful');
        this.router.navigate(['home']);
    }

    public async removeTickerFromWatchlist(ticker: string) {
        this.profileService.removeTicker(ticker);
        this.pageIsLoading = true;
        await this.sleep(1500);
        this.watchlist = await this.profileService.listWatchlist();
        this.pageIsLoading = false;
        console.log(this.watchlist[0]);
    }

    public sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}
