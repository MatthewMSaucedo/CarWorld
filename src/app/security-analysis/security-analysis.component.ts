import { Component, OnInit } from '@angular/core';
import { AppEndpointService } from '../server-communication/app-endpoint.service';
import { device } from 'device.js';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ReportedResponse, GetIntrinsicValueResponse } from '../server-communication/app-endpoint.constants';
import { ReportedService } from './reported/reported.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-security-analysis',
    templateUrl: 'security-analysis.component.html',
    styleUrls: ['security-analysis.component.scss'],
    animations: [
        trigger('expandAppear', [
            transition(':enter', [
                style({transform: 'scale(0)'}),
                animate('200ms ease-in', style({transform: 'scale(1)'}))
            ])
        ]),
        trigger('slideUp', [
            transition(':enter', [
                style({transform: 'translateY(100%)'}),
                animate('300ms ease-in', style({transform: 'translateY(0%)'}))
            ]),
        ]),
    ]
})
export class SecurityAnalysisComponent implements OnInit {
    // Booleans.
    public isMobile: boolean;
    public isLoading = false;
    public shouldShowOwnerSummary = false;

    // Display strings.
    public loadedComponent = 'dashboard';
    public reportedTickerName: string;

    // API data.
    public reportedData;
    public intrinsicValueResponse: GetIntrinsicValueResponse;

    constructor(
        private _endpointService: AppEndpointService,
        public reportedService: ReportedService,
        public toastService: ToastrService
    ) { }

    ngOnInit() {
        // Set view according to device type.
        device.addClasses(document.documentElement);
        this.isMobile = device.mobile;
    }

    public async handleTickerSearch(tickerInput: HTMLInputElement): Promise<void> {
        this.isLoading = true;
        this.shouldShowOwnerSummary = false;

        const ticker = tickerInput.value.toUpperCase();
        this.reportedData = await this._endpointService.getReported({ticker: ticker});

        this.intrinsicValueResponse = await this._endpointService.getIntrinsicValue({ticker: ticker});
        this.reportedService.intrinsicValue = this.intrinsicValueResponse.intrinsicValue.toFixed(2);
        console.log(this.intrinsicValueResponse);

        this.reportedTickerName = tickerInput.value.toUpperCase();
        this.shouldShowOwnerSummary = true;
        this.isLoading = false;
    }

    public handleComponentClick(securityComponent: string): void {
        this.loadedComponent = securityComponent;
    }

    public async handleAddWatchlistClick() {
        try {
            await this.reportedService.addTickerToWatchlist(this.reportedTickerName);
            this.toastService.success("Successfully Added " + this.reportedTickerName + " to WatchList")
        } catch (e) {
            this.toastService.error(e);
        }
    }
}
