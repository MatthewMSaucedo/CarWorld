import { Component, OnInit, Input } from '@angular/core';
import { AppEndpointService } from '../../server-communication/app-endpoint.service';
import { ReportedService } from './reported.service';

@Component({
    selector: 'app-reported',
    template: `
        <div *ngIf="endpointCallIsDone">
            <h3>Income Sheet</h3>
            <app-income-statement-table></app-income-statement-table>
            <h3>Balance Sheet</h3>
            <app-balance-statement-table></app-balance-statement-table>
            <h3>Cashflow Sheet</h3>
            <app-cashflow-statement-table></app-cashflow-statement-table>
        </div>
    `,
    styleUrls: ['reported.component.scss']
})
export class ReportedComponent implements OnInit {
    @Input() ticker: string;
    public endpointCallIsDone: boolean;

    constructor(
        public reportedService: ReportedService,
        private _appEndpointService: AppEndpointService
    ) { }

    async ngOnInit() {
        await this.reportedService.getReportedData(this.ticker);
        this.endpointCallIsDone = true;
    }
}
