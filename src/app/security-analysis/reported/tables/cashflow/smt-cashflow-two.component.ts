import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CashflowSheet } from '../../../../server-communication/app-endpoint.constants';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'smt-cashflow-two',
    template: `
        <table mat-table [dataSource]="dataSource">

            <!-- Metric Column -->
            <ng-container matColumnDef="metric">
                <th mat-header-cell *matHeaderCellDef> Metric </th>
                <td mat-cell *matCellDef="let element"> {{element.metric}} </td>
            </ng-container>

            <!-- _2003 Column -->
            <ng-container matColumnDef="_2003">
                <th mat-header-cell *matHeaderCellDef> 2003 </th>
                <td mat-cell *matCellDef="let element"> {{element._2003}} </td>
            </ng-container>

            <!-- _2004 Column -->
            <ng-container matColumnDef="_2004">
                <th mat-header-cell *matHeaderCellDef> 2004 </th>
                <td mat-cell *matCellDef="let element"> {{element._2004}} </td>
            </ng-container>

            <!-- _2005 Column -->
            <ng-container matColumnDef="_2005">
                <th mat-header-cell *matHeaderCellDef> 2005 </th>
                <td mat-cell *matCellDef="let element"> {{element._2005}} </td>
            </ng-container>

            <!-- _2006 Column -->
            <ng-container matColumnDef="_2006">
                <th mat-header-cell *matHeaderCellDef> 2006 </th>
                <td mat-cell *matCellDef="let element"> {{element._2006}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator [pageSize]="5" showFirstLastButtons></mat-paginator>
    `,
    styleUrls: ['../table.scss']
})
export class SmtCashflowTwoComponent implements OnInit {
    @Input() public cashflowSheet;
    public CASHFLOW_SHEET;
    public displayedColumns: string[] = ['metric', '_2003', '_2004', '_2005', '_2006'];
    public dataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor() { }

    ngOnInit() {
        this.CASHFLOW_SHEET = [
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income', '_2003': this.cashflowSheet[0].niCf, '_2004': this.cashflowSheet[1].niCf, '_2005': this.cashflowSheet[2].niCf, '_2006': this.cashflowSheet[3].niCf},
            // tslint:disable-next-line: max-line-length
            {metric: 'Depreciation & Amortization', '_2003': this.cashflowSheet[0].depreAmort, '_2004': this.cashflowSheet[1].depreAmort, '_2005': this.cashflowSheet[2].depreAmort, '_2006': this.cashflowSheet[3].depreAmort},
            // tslint:disable-next-line: max-line-length
            {metric: 'Non-Cash Items', '_2003': this.cashflowSheet[0].nonCashItems, '_2004': this.cashflowSheet[1].nonCashItems, '_2005': this.cashflowSheet[2].nonCashItems, '_2006': this.cashflowSheet[3].nonCashItems},
            // tslint:disable-next-line: max-line-length
            {metric: 'Stock-Based Compensation', '_2003': this.cashflowSheet[0].stockComp, '_2004': this.cashflowSheet[1].stockComp, '_2005': this.cashflowSheet[2].stockComp, '_2006': this.cashflowSheet[3].stockComp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Income Taxes', '_2003': this.cashflowSheet[0].defIntComp, '_2004': this.cashflowSheet[1].defIntComp, '_2005': this.cashflowSheet[2].defIntComp, '_2006': this.cashflowSheet[3].defIntComp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Non-Cash Adj', '_2003': this.cashflowSheet[0].othNonCashAdj, '_2004': this.cashflowSheet[1].othNonCashAdj, '_2005': this.cashflowSheet[2].othNonCashAdj, '_2006': this.cashflowSheet[3].othNonCashAdj},
            // tslint:disable-next-line: max-line-length
            {metric: 'Chg in Non-Cash Work Cap', '_2003': this.cashflowSheet[0].chgNonCashOp, '_2004': this.cashflowSheet[1].chgNonCashOp, '_2005': this.cashflowSheet[2].chgNonCashOp, '_2006': this.cashflowSheet[3].chgNonCashOp},
            // tslint:disable-next-line: max-line-length
            {metric: '(Inc) Dec in Accts Receiv', '_2003': this.cashflowSheet[0].chgAcctsRec, '_2004': this.cashflowSheet[1].chgAcctsRec, '_2005': this.cashflowSheet[2].chgAcctsRec, '_2006': this.cashflowSheet[3].chgAcctsRec},
            // tslint:disable-next-line: max-line-length
            {metric: '(Inc) Dec in Inventories', '_2003': this.cashflowSheet[0].chgInventories, '_2004': this.cashflowSheet[1].chgInventories, '_2005': this.cashflowSheet[2].chgInventories, '_2006': this.cashflowSheet[3].chgInventories},
            // tslint:disable-next-line: max-line-length
            {metric: 'Inc (Dec) in Accts Payable', '_2003': this.cashflowSheet[0].chgAcctsPayable, '_2004': this.cashflowSheet[1].chgAcctsPayable, '_2005': this.cashflowSheet[2].chgAcctsPayable, '_2006': this.cashflowSheet[3].chgAcctsPayable},
            // tslint:disable-next-line: max-line-length
            {metric: 'Inc (Dec) in Other', '_2003': this.cashflowSheet[0].chgOther, '_2004': this.cashflowSheet[1].chgOther, '_2005': this.cashflowSheet[2].chgOther, '_2006': this.cashflowSheet[3].chgOther},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Cash From Disc Ops', '_2003': this.cashflowSheet[0].netCashDiscOps1, '_2004': this.cashflowSheet[1].netCashDiscOps1, '_2005': this.cashflowSheet[2].netCashDiscOps1, '_2006': this.cashflowSheet[3].netCashDiscOps1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Operating Activities', '_2003': this.cashflowSheet[0].cashOpAct, '_2004': this.cashflowSheet[1].cashOpAct, '_2005': this.cashflowSheet[2].cashOpAct, '_2006': this.cashflowSheet[3].cashOpAct},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Investing Activities', '_2003': this.cashflowSheet[0].cashInvestAct1, '_2004': this.cashflowSheet[1].cashInvestAct1, '_2005': this.cashflowSheet[2].cashInvestAct1, '_2006': this.cashflowSheet[3].cashInvestAct1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Change in Fixed & Intang', '_2003': this.cashflowSheet[0].chgFixedIntang, '_2004': this.cashflowSheet[1].chgFixedIntang, '_2005': this.cashflowSheet[2].chgFixedIntang, '_2006': this.cashflowSheet[3].chgFixedIntang},
            // tslint:disable-next-line: max-line-length
            {metric: 'Disp in Fixed & Intang', '_2003': this.cashflowSheet[0].dispFixedIntang, '_2004': this.cashflowSheet[1].dispFixedIntang, '_2005': this.cashflowSheet[2].dispFixedIntang, '_2006': this.cashflowSheet[3].dispFixedIntang},
            // tslint:disable-next-line: max-line-length
            {metric: 'Disp of Fixed Prod Assets', '_2003': this.cashflowSheet[0].dispFixedProdAssets, '_2004': this.cashflowSheet[1].dispFixedProdAssets, '_2005': this.cashflowSheet[2].dispFixedProdAssets, '_2006': this.cashflowSheet[3].dispFixedProdAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Disp of Intangible Assets', '_2003': this.cashflowSheet[0].dispIntagAssets, '_2004': this.cashflowSheet[1].dispIntagAssets, '_2005': this.cashflowSheet[2].dispIntagAssets, '_2006': this.cashflowSheet[3].dispIntagAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Acq of Fixed & Intang', '_2003': this.cashflowSheet[0].acqFixedIntag, '_2004': this.cashflowSheet[1].acqFixedIntag, '_2005': this.cashflowSheet[2].acqFixedIntag, '_2006': this.cashflowSheet[3].acqFixedIntag},
            // tslint:disable-next-line: max-line-length
            {metric: 'Acq of Fixed Prod Assets', '_2003': this.cashflowSheet[0].acqFixedProdAssets, '_2004': this.cashflowSheet[1].acqFixedProdAssets, '_2005': this.cashflowSheet[2].acqFixedProdAssets, '_2006': this.cashflowSheet[3].acqFixedProdAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Acq of Intangible Assets', '_2003': this.cashflowSheet[0].acqIntagAssets, '_2004': this.cashflowSheet[1].acqIntagAssets, '_2005': this.cashflowSheet[2].acqIntagAssets, '_2006': this.cashflowSheet[3].acqIntagAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Change in LT Investment', '_2003': this.cashflowSheet[0].netChgLtInvest, '_2004': this.cashflowSheet[1].netChgLtInvest, '_2005': this.cashflowSheet[2].netChgLtInvest, '_2006': this.cashflowSheet[3].netChgLtInvest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Dec in LT Investment', '_2003': this.cashflowSheet[0].decLtInvest, '_2004': this.cashflowSheet[1].decLtInvest, '_2005': this.cashflowSheet[2].decLtInvest, '_2006': this.cashflowSheet[3].decLtInvest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Inc in LT Investment', '_2003': this.cashflowSheet[0].incLtInvest, '_2004': this.cashflowSheet[1].incLtInvest, '_2005': this.cashflowSheet[2].incLtInvest, '_2006': this.cashflowSheet[3].incLtInvest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Cash From Acq & Div', '_2003': this.cashflowSheet[0].netCashAcqDiv, '_2004': this.cashflowSheet[1].netCashAcqDiv, '_2005': this.cashflowSheet[2].netCashAcqDiv, '_2006': this.cashflowSheet[3].netCashAcqDiv},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Divestitures', '_2003': this.cashflowSheet[0].cashDivest, '_2004': this.cashflowSheet[1].cashDivest, '_2005': this.cashflowSheet[2].cashDivest, '_2006': this.cashflowSheet[3].cashDivest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash for Acq of Subs', '_2003': this.cashflowSheet[0].cashAcqSubs, '_2004': this.cashflowSheet[1].cashAcqSubs, '_2005': this.cashflowSheet[2].cashAcqSubs, '_2006': this.cashflowSheet[3].cashAcqSubs},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash for JVs', '_2003': this.cashflowSheet[0].cashJvs, '_2004': this.cashflowSheet[1].cashJvs, '_2005': this.cashflowSheet[2].cashJvs, '_2006': this.cashflowSheet[3].cashJvs},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Investing Activities', '_2003': this.cashflowSheet[0].othInvestAct, '_2004': this.cashflowSheet[1].othInvestAct, '_2005': this.cashflowSheet[2].othInvestAct, '_2006': this.cashflowSheet[3].othInvestAct},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Cash From Disc Ops', '_2003': this.cashflowSheet[0].netCashDiscOps2, '_2004': this.cashflowSheet[1].netCashDiscOps2, '_2005': this.cashflowSheet[2].netCashDiscOps2, '_2006': this.cashflowSheet[3].netCashDiscOps2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Investing Activities', '_2003': this.cashflowSheet[0].cashInvestAct2, '_2004': this.cashflowSheet[1].cashInvestAct2, '_2005': this.cashflowSheet[2].cashInvestAct2, '_2006': this.cashflowSheet[3].cashInvestAct2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Financing Activities', '_2003': this.cashflowSheet[0].cashFinAct1, '_2004': this.cashflowSheet[1].cashFinAct1, '_2005': this.cashflowSheet[2].cashFinAct1, '_2006': this.cashflowSheet[3].cashFinAct1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Dividends Paid', '_2003': this.cashflowSheet[0].divsPaid, '_2004': this.cashflowSheet[1].divsPaid, '_2005': this.cashflowSheet[2].divsPaid, '_2006': this.cashflowSheet[3].divsPaid},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash From (Repayment) Debt', '_2003': this.cashflowSheet[0].cashRepayDebt, '_2004': this.cashflowSheet[1].cashRepayDebt, '_2005': this.cashflowSheet[2].cashRepayDebt, '_2006': this.cashflowSheet[3].cashRepayDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash From (Repay) ST Debt', '_2003': this.cashflowSheet[0].cashStDebt, '_2004': this.cashflowSheet[1].cashStDebt, '_2005': this.cashflowSheet[2].cashStDebt, '_2006': this.cashflowSheet[3].cashStDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash From LT Debt', '_2003': this.cashflowSheet[0].cashLtDebt, '_2004': this.cashflowSheet[1].cashLtDebt, '_2005': this.cashflowSheet[2].cashLtDebt, '_2006': this.cashflowSheet[3].cashLtDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Repayments of LT Debt', '_2003': this.cashflowSheet[0].repayLtDebt, '_2004': this.cashflowSheet[1].repayLtDebt, '_2005': this.cashflowSheet[2].repayLtDebt, '_2006': this.cashflowSheet[3].repayLtDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash (Repurchase) of Equity', '_2003': this.cashflowSheet[0].cashRepurchEquity, '_2004': this.cashflowSheet[1].cashRepurchEquity, '_2005': this.cashflowSheet[2].cashRepurchEquity, '_2006': this.cashflowSheet[3].cashRepurchEquity},
            // tslint:disable-next-line: max-line-length
            {metric: 'Increase in Capital Stock', '_2003': this.cashflowSheet[0].incCapitalStock, '_2004': this.cashflowSheet[1].incCapitalStock, '_2005': this.cashflowSheet[2].incCapitalStock, '_2006': this.cashflowSheet[3].incCapitalStock},
            // tslint:disable-next-line: max-line-length
            {metric: 'Decrease in Capital Stock', '_2003': this.cashflowSheet[0].decCapitalStock, '_2004': this.cashflowSheet[1].decCapitalStock, '_2005': this.cashflowSheet[2].decCapitalStock, '_2006': this.cashflowSheet[3].decCapitalStock},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Financing Activities', '_2003': this.cashflowSheet[0].othFinAct, '_2004': this.cashflowSheet[1].othFinAct, '_2005': this.cashflowSheet[2].othFinAct, '_2006': this.cashflowSheet[3].othFinAct},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Cash From Disc Ops', '_2003': this.cashflowSheet[0].netCashDiscOps3, '_2004': this.cashflowSheet[1].netCashDiscOps3, '_2005': this.cashflowSheet[2].netCashDiscOps3, '_2006': this.cashflowSheet[3].netCashDiscOps3},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash from Financing Activities', '_2003': this.cashflowSheet[0].cashFinAct2, '_2004': this.cashflowSheet[1].cashFinAct2, '_2005': this.cashflowSheet[2].cashFinAct2, '_2006': this.cashflowSheet[3].cashFinAct2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Effect of Foreign Exchange Rates', '_2003': this.cashflowSheet[0].effectForexRates, '_2004': this.cashflowSheet[1].effectForexRates, '_2005': this.cashflowSheet[2].effectForexRates, '_2006': this.cashflowSheet[3].effectForexRates},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Changes in Cash', '_2003': this.cashflowSheet[0].netChgCash, '_2004': this.cashflowSheet[1].netChgCash, '_2005': this.cashflowSheet[2].netChgCash, '_2006': this.cashflowSheet[3].netChgCash},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash Paid for Taxes', '_2003': this.cashflowSheet[0].cashPaidTaxes, '_2004': this.cashflowSheet[1].cashPaidTaxes, '_2005': this.cashflowSheet[2].cashPaidTaxes, '_2006': this.cashflowSheet[3].cashPaidTaxes},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash Paid for Interest', '_2003': this.cashflowSheet[0].cashPaidInt, '_2004': this.cashflowSheet[1].cashPaidInt, '_2005': this.cashflowSheet[2].cashPaidInt, '_2006': this.cashflowSheet[3].cashPaidInt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Non-Cash Items', '_2003': this.cashflowSheet[0].nonCashItems, '_2004': this.cashflowSheet[1].nonCashItems, '_2005': this.cashflowSheet[2].nonCashItems, '_2006': this.cashflowSheet[3].nonCashItems},
            // tslint:disable-next-line: max-line-length
            {metric: 'Stock-Based Compensation', '_2003': this.cashflowSheet[0].stockComp, '_2004': this.cashflowSheet[1].stockComp, '_2005': this.cashflowSheet[2].stockComp, '_2006': this.cashflowSheet[3].stockComp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Income Taxes', '_2003': this.cashflowSheet[0].defIntComp, '_2004': this.cashflowSheet[1].defIntComp, '_2005': this.cashflowSheet[2].defIntComp, '_2006': this.cashflowSheet[3].defIntComp},
        ];
        this.dataSource = new MatTableDataSource(this.CASHFLOW_SHEET);
    }

}
