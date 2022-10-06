import { Injectable } from '@angular/core';
import { AppEndpointService } from 'src/app/server-communication/app-endpoint.service';
import { ReportedResponse, IncomeSheet, CashflowSheet, BalanceSheet } from '../../server-communication/app-endpoint.constants';
import { AuthService } from '../../authorization/auth.service';

@Injectable({ providedIn: 'root' })
export class ReportedService {
    public reportedData: ReportedResponse;
    public loggedInUser: string;
    public intrinsicValue: string;

    constructor(
        private _appEndpointService: AppEndpointService,
        public authService: AuthService
    ) {
        this.loggedInUser = this.authService.loggedInUser;
    }

    // Populate service with reported data.
    public async getReportedData(ticker: string): Promise<void> {
        this.reportedData = await this._appEndpointService.getReported({ticker: ticker});
        console.log(this.reportedData);
    }

    // Returns income sheets in groups of 4,
    // ascending order (e.g. [0][0] = 1999, [0][1] = 2000 ... [4][4] = 2019).
    public getIncomeTables(): IncomeSheet[][] {
        const allIncomeSheets = [];
        let upperBound = 19;
        let lowerBound = 15;
        for (let i = 0; i < 5; i++) {
            const fourIncomeSheets = [];

            for (let j = upperBound; j > lowerBound; j--) {
                fourIncomeSheets.push(this.reportedData.fiscalYears[j].incomeSheet);
            }
            upperBound -= 4;
            lowerBound -= 4;
            allIncomeSheets.push(fourIncomeSheets);
        }
        return allIncomeSheets;
    }

    // Returns balance sheets in groups of 4,
    // ascending order (e.g. [0][0] = 1999, [0][1] = 2000 ... [4][4] = 2019).
    public getBalanceTables(): BalanceSheet[][] {
        const allBalanceSheets = [];
        let upperBound = 19;
        let lowerBound = 15;
        for (let i = 0; i < 5; i++) {
            const fourBalanceSheets = [];

            for (let j = upperBound; j > lowerBound; j--) {
                fourBalanceSheets.push(this.reportedData.fiscalYears[j].balanceSheet);
            }
            upperBound -= 4;
            lowerBound -= 4;
            allBalanceSheets.push(fourBalanceSheets);
        }
        return allBalanceSheets;
    }

    // Returns cashflow sheets in groups of 4,
    // ascending order (e.g. [0][0] = 1999, [0][1] = 2000 ... [4][4] = 2019).
    public getCashlowTables(): CashflowSheet[][] {
        const allCashflowSheets = [];
        let upperBound = 19;
        let lowerBound = 15;
        for (let i = 0; i < 5; i++) {
            const fourCashflowSheets = [];

            for (let j = upperBound; j > lowerBound; j--) {
                fourCashflowSheets.push(this.reportedData.fiscalYears[j].cashflowSheet);
            }
            upperBound -= 4;
            lowerBound -= 4;
            allCashflowSheets.push(fourCashflowSheets);
        }
        return allCashflowSheets;
    }

    public addTickerToWatchlist(ticker: string) {
        this._appEndpointService.addWatchlistTicker({username: this.loggedInUser, ticker: ticker});
    }
}
