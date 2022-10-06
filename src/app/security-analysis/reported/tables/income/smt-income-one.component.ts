import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IncomeSheet } from '../../../../server-communication/app-endpoint.constants';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'smt-income-one',
    template: `
        <table mat-table [dataSource]="dataSource">

            <!-- Metric Column -->
            <ng-container matColumnDef="metric">
                <th mat-header-cell *matHeaderCellDef> Metric </th>
                <td mat-cell *matCellDef="let element"> {{element.metric}} </td>
            </ng-container>

            <!-- _1999 Column -->
            <ng-container matColumnDef="_1999">
                <th mat-header-cell *matHeaderCellDef> 1999 </th>
                <td mat-cell *matCellDef="let element"> {{element._1999}} </td>
            </ng-container>

            <!-- _2000 Column -->
            <ng-container matColumnDef="_2000">
                <th mat-header-cell *matHeaderCellDef> 2000 </th>
                <td mat-cell *matCellDef="let element"> {{element._2000}} </td>
            </ng-container>

            <!-- _2001 Column -->
            <ng-container matColumnDef="_2001">
                <th mat-header-cell *matHeaderCellDef> 2001 </th>
                <td mat-cell *matCellDef="let element"> {{element._2001}} </td>
            </ng-container>

            <!-- _2002 Column -->
            <ng-container matColumnDef="_2002">
                <th mat-header-cell *matHeaderCellDef> 2002 </th>
                <td mat-cell *matCellDef="let element"> {{element._2002}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator [pageSize]="5" showFirstLastButtons></mat-paginator>
    `,
    styleUrls: ['../table.scss']
})
export class SmtIncomeOneComponent implements OnInit {
    @Input() public incomeSheet;
    public INCOME_SHEET;
    public displayedColumns: string[] = ['metric', '_1999', '_2000', '_2001', '_2002'];
    public dataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor() { }

    ngOnInit() {
        this.INCOME_SHEET = [
            // tslint:disable-next-line: max-line-length
            {metric: 'Income Tax', '_1999': this.incomeSheet[0].IncTax, '_2000': this.incomeSheet[1].IncTax, '_2001': this.incomeSheet[2].IncTax, '_2002': this.incomeSheet[3].IncTax},
            // tslint:disable-next-line: max-line-length
            {metric: 'X0 & Accounting Changes', '_1999': this.incomeSheet[0].acctChng, '_2000': this.incomeSheet[1].acctChng, '_2001': this.incomeSheet[2].acctChng, '_2002': this.incomeSheet[3].acctChng},
            // tslint:disable-next-line: max-line-length
            {metric: '(Income) Loss from Affiliates', '_1999': this.incomeSheet[0].affiliates, '_2000': this.incomeSheet[1].affiliates, '_2001': this.incomeSheet[2].affiliates, '_2002': this.incomeSheet[3].affiliates},
            // tslint:disable-next-line: max-line-length
            {metric: 'Basic Weighted Avg Shares', '_1999': this.incomeSheet[0].basicWeightAvgShares, '_2000': this.incomeSheet[1].basicWeightAvgShares, '_2001': this.incomeSheet[2].basicWeightAvgShares, '_2002': this.incomeSheet[3].basicWeightAvgShares},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cost of Goods & Services', '_1999': this.incomeSheet[0].cogs, '_2000': this.incomeSheet[1].cogs, '_2001': this.incomeSheet[2].cogs, '_2002': this.incomeSheet[3].cogs},
            // tslint:disable-next-line: max-line-length
            {metric: 'Income (Loss) from Cont Ops', '_1999': this.incomeSheet[0].contOps, '_2000': this.incomeSheet[1].contOps, '_2001': this.incomeSheet[2].contOps, '_2002': this.incomeSheet[3].contOps},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cost of Revenue', '_1999': this.incomeSheet[0].costOfRev, '_2000': this.incomeSheet[1].costOfRev, '_2001': this.incomeSheet[2].costOfRev, '_2002': this.incomeSheet[3].costOfRev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Current Income Tax', '_1999': this.incomeSheet[0].currIncTax, '_2000': this.incomeSheet[1].currIncTax, '_2001': this.incomeSheet[2].currIncTax, '_2002': this.incomeSheet[3].currIncTax},
            // tslint:disable-next-line: max-line-length
            {metric: 'Diluted Weighted Avg Shares', '_1999': this.incomeSheet[0].dilWeightAvgShares, '_2000': this.incomeSheet[1].dilWeightAvgShares, '_2001': this.incomeSheet[2].dilWeightAvgShares, '_2002': this.incomeSheet[3].dilWeightAvgShares},
            // tslint:disable-next-line: max-line-length
            {metric: 'Discontinued Operations', '_1999': this.incomeSheet[0].discOps, '_2000': this.incomeSheet[1].discOps, '_2001': this.incomeSheet[2].discOps, '_2002': this.incomeSheet[3].discOps},
            // tslint:disable-next-line: max-line-length
            {metric: 'Foreign Exch (Gain) Loss', '_1999': this.incomeSheet[0].forex, '_2000': this.incomeSheet[1].forex, '_2001': this.incomeSheet[2].forex, '_2002': this.incomeSheet[3].forex},
            // tslint:disable-next-line: max-line-length
            {metric: 'Income (Loss) Incl. MI', '_1999': this.incomeSheet[0].incomeMi, '_2000': this.incomeSheet[1].incomeMi, '_2001': this.incomeSheet[2].incomeMi, '_2002': this.incomeSheet[3].incomeMi},
            // tslint:disable-next-line: max-line-length
            {metric: 'Interest Expense', '_1999': this.incomeSheet[0].intExp, '_2000': this.incomeSheet[1].intExp, '_2001': this.incomeSheet[2].intExp, '_2002': this.incomeSheet[3].intExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Minority Interest', '_1999': this.incomeSheet[0].minInterest, '_2000': this.incomeSheet[1].minInterest, '_2001': this.incomeSheet[2].minInterest, '_2002': this.incomeSheet[3].minInterest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Abnormal Losses (Gains)', '_1999': this.incomeSheet[0].netAbnormal, '_2000': this.incomeSheet[1].netAbnormal, '_2001': this.incomeSheet[2].netAbnormal, '_2002': this.incomeSheet[3].netAbnormal},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Extraordinary Losses (Gains)', '_1999': this.incomeSheet[0].netExtra1, '_2000': this.incomeSheet[1].netExtra1, '_2001': this.incomeSheet[2].netExtra1, '_2002': this.incomeSheet[3].netExtra1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Interest Expense, Net', '_1999': this.incomeSheet[0].netIntExp, '_2000': this.incomeSheet[1].netIntExp, '_2001': this.incomeSheet[2].netIntExp, '_2002': this.incomeSheet[3].netIntExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income Avail to Common, Adj', '_1999': this.incomeSheet[0].niAvailCommonAdj, '_2000': this.incomeSheet[1].niAvailCommonAdj, '_2001': this.incomeSheet[2].niAvailCommonAdj, '_2002': this.incomeSheet[3].niAvailCommonAdj},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income Avail to Common, GAAP', '_1999': this.incomeSheet[0].niAvailCommonGaap, '_2000': this.incomeSheet[1].niAvailCommonGaap, '_2001': this.incomeSheet[2].niAvailCommonGaap, '_2002': this.incomeSheet[3].niAvailCommonGaap},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income, GAAP', '_1999': this.incomeSheet[0].niInc, '_2000': this.incomeSheet[1].niInc, '_2001': this.incomeSheet[2].niInc, '_2002': this.incomeSheet[3].niInc},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Non-Op (Income) Loss', '_1999': this.incomeSheet[0].nonOpInc, '_2000': this.incomeSheet[1].nonOpInc, '_2001': this.incomeSheet[2].nonOpInc, '_2002': this.incomeSheet[3].nonOpInc},
            // tslint:disable-next-line: max-line-length
            {metric: 'Non-Operating (Income) Loss', '_1999': this.incomeSheet[0].nonOpIncLoss, '_2000': this.incomeSheet[1].nonOpIncLoss, '_2001': this.incomeSheet[2].nonOpIncLoss, '_2002': this.incomeSheet[3].nonOpIncLoss},
            // tslint:disable-next-line: max-line-length
            {metric: 'Operating Expenses', '_1999': this.incomeSheet[0].opExp, '_2000': this.incomeSheet[1].opExp, '_2001': this.incomeSheet[2].opExp, '_2002': this.incomeSheet[3].opExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Adjustments', '_1999': this.incomeSheet[0].othAdj, '_2000': this.incomeSheet[1].othAdj, '_2001': this.incomeSheet[2].othAdj, '_2002': this.incomeSheet[3].othAdj},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Operating Expense', '_1999': this.incomeSheet[0].othOpExp, '_2000': this.incomeSheet[1].othOpExp, '_2001': this.incomeSheet[2].othOpExp, '_2002': this.incomeSheet[3].othOpExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Operating Income', '_1999': this.incomeSheet[0].otherProfit, '_2000': this.incomeSheet[1].otherProfit, '_2001': this.incomeSheet[2].otherProfit, '_2002': this.incomeSheet[3].otherProfit},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Revenue', '_1999': this.incomeSheet[0].otherRev, '_2000': this.incomeSheet[1].otherRev, '_2001': this.incomeSheet[2].otherRev, '_2002': this.incomeSheet[3].otherRev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Preferred Dividends', '_1999': this.incomeSheet[0].prefDivs, '_2000': this.incomeSheet[1].prefDivs, '_2001': this.incomeSheet[2].prefDivs, '_2002': this.incomeSheet[3].prefDivs},
            // tslint:disable-next-line: max-line-length
            {metric: 'Pretax Income', '_1999': this.incomeSheet[0].pretaxIncome, '_2000': this.incomeSheet[1].pretaxIncome, '_2001': this.incomeSheet[2].pretaxIncome, '_2002': this.incomeSheet[3].pretaxIncome},
            // tslint:disable-next-line: max-line-length
            {metric: 'Gross Profit', '_1999': this.incomeSheet[0].proft, '_2000': this.incomeSheet[1].profit, '_2001': this.incomeSheet[2].profit, '_2002': this.incomeSheet[3].profit},
            // tslint:disable-next-line: max-line-length
            {metric: 'Revenue', '_1999': this.incomeSheet[0].rev, '_2000': this.incomeSheet[1].rev, '_2001': this.incomeSheet[2].rev, '_2002': this.incomeSheet[3].rev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Sales & Services Revenue', '_1999': this.incomeSheet[0].salesServRev, '_2000': this.incomeSheet[1].salesServRev, '_2001': this.incomeSheet[2].salesServRev, '_2002': this.incomeSheet[3].salesServRev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Selling, General & Admin', '_1999': this.incomeSheet[0].sgAndAdmin, '_2000': this.incomeSheet[1].sgAndAdmin, '_2001': this.incomeSheet[2].sgAndAdmin, '_2002': this.incomeSheet[3].sgAndAdmin},
            // tslint:disable-next-line: max-line-length
            {metric: 'Discontinued Operations', '_1999': this.incomeSheet[0].discOps, '_2000': this.incomeSheet[1].discOps, '_2001': this.incomeSheet[2].discOps, '_2002': this.incomeSheet[3].discOps},
            // tslint:disable-next-line: max-line-length
            {metric: 'Foreign Exch (Gain) Loss', '_1999': this.incomeSheet[0].forex, '_2000': this.incomeSheet[1].forex, '_2001': this.incomeSheet[2].forex, '_2002': this.incomeSheet[3].forex}
        ];
        this.dataSource = new MatTableDataSource(this.INCOME_SHEET);
    }

}
