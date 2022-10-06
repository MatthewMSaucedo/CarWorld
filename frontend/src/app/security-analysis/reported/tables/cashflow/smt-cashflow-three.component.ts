import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CashflowSheet } from '../../../../server-communication/app-endpoint.constants';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'smt-cashflow-three',
    template: `
        <table mat-table [dataSource]="dataSource">

            <!-- Metric Column -->
            <ng-container matColumnDef="metric">
                <th mat-header-cell *matHeaderCellDef> Metric </th>
                <td mat-cell *matCellDef="let element"> {{element.metric}} </td>
            </ng-container>

            <!-- _2007 Column -->
            <ng-container matColumnDef="_2007">
                <th mat-header-cell *matHeaderCellDef> 2007 </th>
                <td mat-cell *matCellDef="let element"> {{element._2007}} </td>
            </ng-container>

            <!-- _2008 Column -->
            <ng-container matColumnDef="_2008">
                <th mat-header-cell *matHeaderCellDef> 2008 </th>
                <td mat-cell *matCellDef="let element"> {{element._2008}} </td>
            </ng-container>

            <!-- _2009 Column -->
            <ng-container matColumnDef="_2009">
                <th mat-header-cell *matHeaderCellDef> 2009 </th>
                <td mat-cell *matCellDef="let element"> {{element._2009}} </td>
            </ng-container>

            <!-- _2010 Column -->
            <ng-container matColumnDef="_2010">
                <th mat-header-cell *matHeaderCellDef> 2010 </th>
                <td mat-cell *matCellDef="let element"> {{element._2010}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator [pageSize]="5" showFirstLastButtons></mat-paginator>
    `,
    styleUrls: ['../table.scss']
})
export class SmtCashflowThreeComponent implements OnInit {
    @Input() public cashflowSheet;
    public CASHFLOW_SHEET;
    public displayedColumns: string[] = ['metric', '_2007', '_2008', '_2009', '_2010'];
    public dataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor() { }

    ngOnInit() {
        this.CASHFLOW_SHEET = [
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income', '_2007': this.cashflowSheet[0].niCf, '_2008': this.cashflowSheet[1].niCf, '_2009': this.cashflowSheet[2].niCf, '_2010': this.cashflowSheet[3].niCf},
            // tslint:disable-next-line: max-line-length
            {metric: 'Depreciation & Amortization', '_2007': this.cashflowSheet[0].depreAmort, '_2008': this.cashflowSheet[1].depreAmort, '_2009': this.cashflowSheet[2].depreAmort, '_2010': this.cashflowSheet[3].depreAmort},
            // tslint:disable-next-line: max-line-length
            {metric: 'Non-Cash Items', '_2007': this.cashflowSheet[0].nonCashItems, '_2008': this.cashflowSheet[1].nonCashItems, '_2009': this.cashflowSheet[2].nonCashItems, '_2010': this.cashflowSheet[3].nonCashItems},
            // tslint:disable-next-line: max-line-length
            {metric: 'Stock-Based Compensation', '_2007': this.cashflowSheet[0].stockComp, '_2008': this.cashflowSheet[1].stockComp, '_2009': this.cashflowSheet[2].stockComp, '_2010': this.cashflowSheet[3].stockComp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Income Taxes', '_2007': this.cashflowSheet[0].defIntComp, '_2008': this.cashflowSheet[1].defIntComp, '_2009': this.cashflowSheet[2].defIntComp, '_2010': this.cashflowSheet[3].defIntComp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Non-Cash Adj', '_2007': this.cashflowSheet[0].othNonCashAdj, '_2008': this.cashflowSheet[1].othNonCashAdj, '_2009': this.cashflowSheet[2].othNonCashAdj, '_2010': this.cashflowSheet[3].othNonCashAdj},
            // tslint:disable-next-line: max-line-length
            {metric: 'Chg in Non-Cash Work Cap', '_2007': this.cashflowSheet[0].chgNonCashOp, '_2008': this.cashflowSheet[1].chgNonCashOp, '_2009': this.cashflowSheet[2].chgNonCashOp, '_2010': this.cashflowSheet[3].chgNonCashOp},
            // tslint:disable-next-line: max-line-length
            {metric: '(Inc) Dec in Accts Receiv', '_2007': this.cashflowSheet[0].chgAcctsRec, '_2008': this.cashflowSheet[1].chgAcctsRec, '_2009': this.cashflowSheet[2].chgAcctsRec, '_2010': this.cashflowSheet[3].chgAcctsRec},
            // tslint:disable-next-line: max-line-length
            {metric: '(Inc) Dec in Inventories', '_2007': this.cashflowSheet[0].chgInventories, '_2008': this.cashflowSheet[1].chgInventories, '_2009': this.cashflowSheet[2].chgInventories, '_2010': this.cashflowSheet[3].chgInventories},
            // tslint:disable-next-line: max-line-length
            {metric: 'Inc (Dec) in Accts Payable', '_2007': this.cashflowSheet[0].chgAcctsPayable, '_2008': this.cashflowSheet[1].chgAcctsPayable, '_2009': this.cashflowSheet[2].chgAcctsPayable, '_2010': this.cashflowSheet[3].chgAcctsPayable},
            // tslint:disable-next-line: max-line-length
            {metric: 'Inc (Dec) in Other', '_2007': this.cashflowSheet[0].chgOther, '_2008': this.cashflowSheet[1].chgOther, '_2009': this.cashflowSheet[2].chgOther, '_2010': this.cashflowSheet[3].chgOther},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Cash From Disc Ops', '_2007': this.cashflowSheet[0].netCashDiscOps1, '_2008': this.cashflowSheet[1].netCashDiscOps1, '_2009': this.cashflowSheet[2].netCashDiscOps1, '_2010': this.cashflowSheet[3].netCashDiscOps1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Operating Activities', '_2007': this.cashflowSheet[0].cashOpAct, '_2008': this.cashflowSheet[1].cashOpAct, '_2009': this.cashflowSheet[2].cashOpAct, '_2010': this.cashflowSheet[3].cashOpAct},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Investing Activities', '_2007': this.cashflowSheet[0].cashInvestAct1, '_2008': this.cashflowSheet[1].cashInvestAct1, '_2009': this.cashflowSheet[2].cashInvestAct1, '_2010': this.cashflowSheet[3].cashInvestAct1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Change in Fixed & Intang', '_2007': this.cashflowSheet[0].chgFixedIntang, '_2008': this.cashflowSheet[1].chgFixedIntang, '_2009': this.cashflowSheet[2].chgFixedIntang, '_2010': this.cashflowSheet[3].chgFixedIntang},
            // tslint:disable-next-line: max-line-length
            {metric: 'Disp in Fixed & Intang', '_2007': this.cashflowSheet[0].dispFixedIntang, '_2008': this.cashflowSheet[1].dispFixedIntang, '_2009': this.cashflowSheet[2].dispFixedIntang, '_2010': this.cashflowSheet[3].dispFixedIntang},
            // tslint:disable-next-line: max-line-length
            {metric: 'Disp of Fixed Prod Assets', '_2007': this.cashflowSheet[0].dispFixedProdAssets, '_2008': this.cashflowSheet[1].dispFixedProdAssets, '_2009': this.cashflowSheet[2].dispFixedProdAssets, '_2010': this.cashflowSheet[3].dispFixedProdAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Disp of Intangible Assets', '_2007': this.cashflowSheet[0].dispIntagAssets, '_2008': this.cashflowSheet[1].dispIntagAssets, '_2009': this.cashflowSheet[2].dispIntagAssets, '_2010': this.cashflowSheet[3].dispIntagAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Acq of Fixed & Intang', '_2007': this.cashflowSheet[0].acqFixedIntag, '_2008': this.cashflowSheet[1].acqFixedIntag, '_2009': this.cashflowSheet[2].acqFixedIntag, '_2010': this.cashflowSheet[3].acqFixedIntag},
            // tslint:disable-next-line: max-line-length
            {metric: 'Acq of Fixed Prod Assets', '_2007': this.cashflowSheet[0].acqFixedProdAssets, '_2008': this.cashflowSheet[1].acqFixedProdAssets, '_2009': this.cashflowSheet[2].acqFixedProdAssets, '_2010': this.cashflowSheet[3].acqFixedProdAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Acq of Intangible Assets', '_2007': this.cashflowSheet[0].acqIntagAssets, '_2008': this.cashflowSheet[1].acqIntagAssets, '_2009': this.cashflowSheet[2].acqIntagAssets, '_2010': this.cashflowSheet[3].acqIntagAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Change in LT Investment', '_2007': this.cashflowSheet[0].netChgLtInvest, '_2008': this.cashflowSheet[1].netChgLtInvest, '_2009': this.cashflowSheet[2].netChgLtInvest, '_2010': this.cashflowSheet[3].netChgLtInvest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Dec in LT Investment', '_2007': this.cashflowSheet[0].decLtInvest, '_2008': this.cashflowSheet[1].decLtInvest, '_2009': this.cashflowSheet[2].decLtInvest, '_2010': this.cashflowSheet[3].decLtInvest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Inc in LT Investment', '_2007': this.cashflowSheet[0].incLtInvest, '_2008': this.cashflowSheet[1].incLtInvest, '_2009': this.cashflowSheet[2].incLtInvest, '_2010': this.cashflowSheet[3].incLtInvest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Cash From Acq & Div', '_2007': this.cashflowSheet[0].netCashAcqDiv, '_2008': this.cashflowSheet[1].netCashAcqDiv, '_2009': this.cashflowSheet[2].netCashAcqDiv, '_2010': this.cashflowSheet[3].netCashAcqDiv},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Divestitures', '_2007': this.cashflowSheet[0].cashDivest, '_2008': this.cashflowSheet[1].cashDivest, '_2009': this.cashflowSheet[2].cashDivest, '_2010': this.cashflowSheet[3].cashDivest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash for Acq of Subs', '_2007': this.cashflowSheet[0].cashAcqSubs, '_2008': this.cashflowSheet[1].cashAcqSubs, '_2009': this.cashflowSheet[2].cashAcqSubs, '_2010': this.cashflowSheet[3].cashAcqSubs},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash for JVs', '_2007': this.cashflowSheet[0].cashJvs, '_2008': this.cashflowSheet[1].cashJvs, '_2009': this.cashflowSheet[2].cashJvs, '_2010': this.cashflowSheet[3].cashJvs},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Investing Activities', '_2007': this.cashflowSheet[0].othInvestAct, '_2008': this.cashflowSheet[1].othInvestAct, '_2009': this.cashflowSheet[2].othInvestAct, '_2010': this.cashflowSheet[3].othInvestAct},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Cash From Disc Ops', '_2007': this.cashflowSheet[0].netCashDiscOps2, '_2008': this.cashflowSheet[1].netCashDiscOps2, '_2009': this.cashflowSheet[2].netCashDiscOps2, '_2010': this.cashflowSheet[3].netCashDiscOps2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Investing Activities', '_2007': this.cashflowSheet[0].cashInvestAct2, '_2008': this.cashflowSheet[1].cashInvestAct2, '_2009': this.cashflowSheet[2].cashInvestAct2, '_2010': this.cashflowSheet[3].cashInvestAct2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Financing Activities', '_2007': this.cashflowSheet[0].cashFinAct1, '_2008': this.cashflowSheet[1].cashFinAct1, '_2009': this.cashflowSheet[2].cashFinAct1, '_2010': this.cashflowSheet[3].cashFinAct1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Dividends Paid', '_2007': this.cashflowSheet[0].divsPaid, '_2008': this.cashflowSheet[1].divsPaid, '_2009': this.cashflowSheet[2].divsPaid, '_2010': this.cashflowSheet[3].divsPaid},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash From (Repayment) Debt', '_2007': this.cashflowSheet[0].cashRepayDebt, '_2008': this.cashflowSheet[1].cashRepayDebt, '_2009': this.cashflowSheet[2].cashRepayDebt, '_2010': this.cashflowSheet[3].cashRepayDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash From (Repay) ST Debt', '_2007': this.cashflowSheet[0].cashStDebt, '_2008': this.cashflowSheet[1].cashStDebt, '_2009': this.cashflowSheet[2].cashStDebt, '_2010': this.cashflowSheet[3].cashStDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash From LT Debt', '_2007': this.cashflowSheet[0].cashLtDebt, '_2008': this.cashflowSheet[1].cashLtDebt, '_2009': this.cashflowSheet[2].cashLtDebt, '_2010': this.cashflowSheet[3].cashLtDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Repayments of LT Debt', '_2007': this.cashflowSheet[0].repayLtDebt, '_2008': this.cashflowSheet[1].repayLtDebt, '_2009': this.cashflowSheet[2].repayLtDebt, '_2010': this.cashflowSheet[3].repayLtDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash (Repurchase) of Equity', '_2007': this.cashflowSheet[0].cashRepurchEquity, '_2008': this.cashflowSheet[1].cashRepurchEquity, '_2009': this.cashflowSheet[2].cashRepurchEquity, '_2010': this.cashflowSheet[3].cashRepurchEquity},
            // tslint:disable-next-line: max-line-length
            {metric: 'Increase in Capital Stock', '_2007': this.cashflowSheet[0].incCapitalStock, '_2008': this.cashflowSheet[1].incCapitalStock, '_2009': this.cashflowSheet[2].incCapitalStock, '_2010': this.cashflowSheet[3].incCapitalStock},
            // tslint:disable-next-line: max-line-length
            {metric: 'Decrease in Capital Stock', '_2007': this.cashflowSheet[0].decCapitalStock, '_2008': this.cashflowSheet[1].decCapitalStock, '_2009': this.cashflowSheet[2].decCapitalStock, '_2010': this.cashflowSheet[3].decCapitalStock},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Financing Activities', '_2007': this.cashflowSheet[0].othFinAct, '_2008': this.cashflowSheet[1].othFinAct, '_2009': this.cashflowSheet[2].othFinAct, '_2010': this.cashflowSheet[3].othFinAct},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Cash From Disc Ops', '_2007': this.cashflowSheet[0].netCashDiscOps3, '_2008': this.cashflowSheet[1].netCashDiscOps3, '_2009': this.cashflowSheet[2].netCashDiscOps3, '_2010': this.cashflowSheet[3].netCashDiscOps3},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Financing Activities', '_2007': this.cashflowSheet[0].cashFinAct2, '_2008': this.cashflowSheet[1].cashFinAct2, '_2009': this.cashflowSheet[2].cashFinAct2, '_2010': this.cashflowSheet[3].cashFinAct2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Effect of Foreign Exchange Rates', '_2007': this.cashflowSheet[0].effectForexRates, '_2008': this.cashflowSheet[1].effectForexRates, '_2009': this.cashflowSheet[2].effectForexRates, '_2010': this.cashflowSheet[3].effectForexRates},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Changes in Cash', '_2007': this.cashflowSheet[0].netChgCash, '_2008': this.cashflowSheet[1].netChgCash, '_2009': this.cashflowSheet[2].netChgCash, '_2010': this.cashflowSheet[3].netChgCash},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash Paid for Taxes', '_2007': this.cashflowSheet[0].cashPaidTaxes, '_2008': this.cashflowSheet[1].cashPaidTaxes, '_2009': this.cashflowSheet[2].cashPaidTaxes, '_2010': this.cashflowSheet[3].cashPaidTaxes},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash Paid for Interest', '_2007': this.cashflowSheet[0].cashPaidInt, '_2008': this.cashflowSheet[1].cashPaidInt, '_2009': this.cashflowSheet[2].cashPaidInt, '_2010': this.cashflowSheet[3].cashPaidInt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Non-Cash Items', '_2007': this.cashflowSheet[0].nonCashItems, '_2008': this.cashflowSheet[1].nonCashItems, '_2009': this.cashflowSheet[2].nonCashItems, '_2010': this.cashflowSheet[3].nonCashItems},
            // tslint:disable-next-line: max-line-length
            {metric: 'Stock-Based Compensation', '_2007': this.cashflowSheet[0].stockComp, '_2008': this.cashflowSheet[1].stockComp, '_2009': this.cashflowSheet[2].stockComp, '_2010': this.cashflowSheet[3].stockComp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Income Taxes', '_2007': this.cashflowSheet[0].defIntComp, '_2008': this.cashflowSheet[1].defIntComp, '_2009': this.cashflowSheet[2].defIntComp, '_2010': this.cashflowSheet[3].defIntComp},
        ];
        this.dataSource = new MatTableDataSource(this.CASHFLOW_SHEET);
    }

}
