import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IncomeSheet } from '../../../../server-communication/app-endpoint.constants';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'smt-income-four',
    template: `
        <table mat-table [dataSource]="dataSource">

            <!-- Metric Column -->
            <ng-container matColumnDef="metric">
                <th mat-header-cell *matHeaderCellDef> Metric </th>
                <td mat-cell *matCellDef="let element"> {{element.metric}} </td>
            </ng-container>

            <!-- _2011 Column -->
            <ng-container matColumnDef="_2011">
                <th mat-header-cell *matHeaderCellDef> 2011 </th>
                <td mat-cell *matCellDef="let element"> {{element._2011}} </td>
            </ng-container>

            <!-- _2012 Column -->
            <ng-container matColumnDef="_2012">
                <th mat-header-cell *matHeaderCellDef> 2012 </th>
                <td mat-cell *matCellDef="let element"> {{element._2012}} </td>
            </ng-container>

            <!-- _2013 Column -->
            <ng-container matColumnDef="_2013">
                <th mat-header-cell *matHeaderCellDef> 2013 </th>
                <td mat-cell *matCellDef="let element"> {{element._2013}} </td>
            </ng-container>

            <!-- _2014 Column -->
            <ng-container matColumnDef="_2014">
                <th mat-header-cell *matHeaderCellDef> 2014 </th>
                <td mat-cell *matCellDef="let element"> {{element._2014}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator [pageSize]="5" showFirstLastButtons></mat-paginator>
    `,
    styleUrls: ['../table.scss']
})
export class SmtIncomeFourComponent implements OnInit {
    @Input() public incomeSheet;
    public INCOME_SHEET;
    public displayedColumns: string[] = ['metric', '_2011', '_2012', '_2013', '_2014'];
    public dataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor() { }

    ngOnInit() {
        this.INCOME_SHEET = [
            // tslint:disable-next-line: max-line-length
            {metric: 'Income Tax', '_2011': this.incomeSheet[0].IncTax, '_2012': this.incomeSheet[1].IncTax, '_2013': this.incomeSheet[2].IncTax, '_2014': this.incomeSheet[3].IncTax},
            // tslint:disable-next-line: max-line-length
            {metric: 'X0 & Accounting Changes', '_2011': this.incomeSheet[0].acctChng, '_2012': this.incomeSheet[1].acctChng, '_2013': this.incomeSheet[2].acctChng, '_2014': this.incomeSheet[3].acctChng},
            // tslint:disable-next-line: max-line-length
            {metric: '(Income) Loss from Affiliates', '_2011': this.incomeSheet[0].affiliates, '_2012': this.incomeSheet[1].affiliates, '_2013': this.incomeSheet[2].affiliates, '_2014': this.incomeSheet[3].affiliates},
            // tslint:disable-next-line: max-line-length
            {metric: 'Basic Weighted Avg Shares', '_2011': this.incomeSheet[0].basicWeightAvgShares, '_2012': this.incomeSheet[1].basicWeightAvgShares, '_2013': this.incomeSheet[2].basicWeightAvgShares, '_2014': this.incomeSheet[3].basicWeightAvgShares},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cost of Goods & Services', '_2011': this.incomeSheet[0].cogs, '_2012': this.incomeSheet[1].cogs, '_2013': this.incomeSheet[2].cogs, '_2014': this.incomeSheet[3].cogs},
            // tslint:disable-next-line: max-line-length
            {metric: 'Income (Loss) from Cont Ops', '_2011': this.incomeSheet[0].contOps, '_2012': this.incomeSheet[1].contOps, '_2013': this.incomeSheet[2].contOps, '_2014': this.incomeSheet[3].contOps},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cost of Revenue', '_2011': this.incomeSheet[0].costOfRev, '_2012': this.incomeSheet[1].costOfRev, '_2013': this.incomeSheet[2].costOfRev, '_2014': this.incomeSheet[3].costOfRev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Current Income Tax', '_2011': this.incomeSheet[0].currIncTax, '_2012': this.incomeSheet[1].currIncTax, '_2013': this.incomeSheet[2].currIncTax, '_2014': this.incomeSheet[3].currIncTax},
            // tslint:disable-next-line: max-line-length
            {metric: 'Diluted Weighted Avg Shares', '_2011': this.incomeSheet[0].dilWeightAvgShares, '_2012': this.incomeSheet[1].dilWeightAvgShares, '_2013': this.incomeSheet[2].dilWeightAvgShares, '_2014': this.incomeSheet[3].dilWeightAvgShares},
            // tslint:disable-next-line: max-line-length
            {metric: 'Discontinued Operations', '_2011': this.incomeSheet[0].discOps, '_2012': this.incomeSheet[1].discOps, '_2013': this.incomeSheet[2].discOps, '_2014': this.incomeSheet[3].discOps},
            // tslint:disable-next-line: max-line-length
            {metric: 'Foreign Exch (Gain) Loss', '_2011': this.incomeSheet[0].forex, '_2012': this.incomeSheet[1].forex, '_2013': this.incomeSheet[2].forex, '_2014': this.incomeSheet[3].forex},
            // tslint:disable-next-line: max-line-length
            {metric: 'Income (Loss) Incl. MI', '_2011': this.incomeSheet[0].incomeMi, '_2012': this.incomeSheet[1].incomeMi, '_2013': this.incomeSheet[2].incomeMi, '_2014': this.incomeSheet[3].incomeMi},
            // tslint:disable-next-line: max-line-length
            {metric: 'Interest Expense', '_2011': this.incomeSheet[0].intExp, '_2012': this.incomeSheet[1].intExp, '_2013': this.incomeSheet[2].intExp, '_2014': this.incomeSheet[3].intExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Minority Interest', '_2011': this.incomeSheet[0].minInterest, '_2012': this.incomeSheet[1].minInterest, '_2013': this.incomeSheet[2].minInterest, '_2014': this.incomeSheet[3].minInterest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Abnormal Losses (Gains)', '_2011': this.incomeSheet[0].netAbnormal, '_2012': this.incomeSheet[1].netAbnormal, '_2013': this.incomeSheet[2].netAbnormal, '_2014': this.incomeSheet[3].netAbnormal},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Extraordinary Losses (Gains)', '_2011': this.incomeSheet[0].netExtra1, '_2012': this.incomeSheet[1].netExtra1, '_2013': this.incomeSheet[2].netExtra1, '_2014': this.incomeSheet[3].netExtra1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Interest Expense, Net', '_2011': this.incomeSheet[0].netIntExp, '_2012': this.incomeSheet[1].netIntExp, '_2013': this.incomeSheet[2].netIntExp, '_2014': this.incomeSheet[3].netIntExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income Avail to Common, Adj', '_2011': this.incomeSheet[0].niAvailCommonAdj, '_2012': this.incomeSheet[1].niAvailCommonAdj, '_2013': this.incomeSheet[2].niAvailCommonAdj, '_2014': this.incomeSheet[3].niAvailCommonAdj},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income Avail to Common, GAAP', '_2011': this.incomeSheet[0].niAvailCommonGaap, '_2012': this.incomeSheet[1].niAvailCommonGaap, '_2013': this.incomeSheet[2].niAvailCommonGaap, '_2014': this.incomeSheet[3].niAvailCommonGaap},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income, GAAP', '_2011': this.incomeSheet[0].niInc, '_2012': this.incomeSheet[1].niInc, '_2013': this.incomeSheet[2].niInc, '_2014': this.incomeSheet[3].niInc},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Non-Op (Income) Loss', '_2011': this.incomeSheet[0].nonOpInc, '_2012': this.incomeSheet[1].nonOpInc, '_2013': this.incomeSheet[2].nonOpInc, '_2014': this.incomeSheet[3].nonOpInc},
            // tslint:disable-next-line: max-line-length
            {metric: 'Non-Operating (Income) Loss', '_2011': this.incomeSheet[0].nonOpIncLoss, '_2012': this.incomeSheet[1].nonOpIncLoss, '_2013': this.incomeSheet[2].nonOpIncLoss, '_2014': this.incomeSheet[3].nonOpIncLoss},
            // tslint:disable-next-line: max-line-length
            {metric: 'Operating Expenses', '_2011': this.incomeSheet[0].opExp, '_2012': this.incomeSheet[1].opExp, '_2013': this.incomeSheet[2].opExp, '_2014': this.incomeSheet[3].opExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Adjustments', '_2011': this.incomeSheet[0].othAdj, '_2012': this.incomeSheet[1].othAdj, '_2013': this.incomeSheet[2].othAdj, '_2014': this.incomeSheet[3].othAdj},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Operating Expense', '_2011': this.incomeSheet[0].othOpExp, '_2012': this.incomeSheet[1].othOpExp, '_2013': this.incomeSheet[2].othOpExp, '_2014': this.incomeSheet[3].othOpExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Operating Income', '_2011': this.incomeSheet[0].otherProfit, '_2012': this.incomeSheet[1].otherProfit, '_2013': this.incomeSheet[2].otherProfit, '_2014': this.incomeSheet[3].otherProfit},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Revenue', '_2011': this.incomeSheet[0].otherRev, '_2012': this.incomeSheet[1].otherRev, '_2013': this.incomeSheet[2].otherRev, '_2014': this.incomeSheet[3].otherRev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Preferred Dividends', '_2011': this.incomeSheet[0].prefDivs, '_2012': this.incomeSheet[1].prefDivs, '_2013': this.incomeSheet[2].prefDivs, '_2014': this.incomeSheet[3].prefDivs},
            // tslint:disable-next-line: max-line-length
            {metric: 'Pretax Income', '_2011': this.incomeSheet[0].pretaxIncome, '_2012': this.incomeSheet[1].pretaxIncome, '_2013': this.incomeSheet[2].pretaxIncome, '_2014': this.incomeSheet[3].pretaxIncome},
            // tslint:disable-next-line: max-line-length
            {metric: 'Gross Profit', '_2011': this.incomeSheet[0].proft, '_2012': this.incomeSheet[1].profit, '_2013': this.incomeSheet[2].profit, '_2014': this.incomeSheet[3].profit},
            // tslint:disable-next-line: max-line-length
            {metric: 'Revenue', '_2011': this.incomeSheet[0].rev, '_2012': this.incomeSheet[1].rev, '_2013': this.incomeSheet[2].rev, '_2014': this.incomeSheet[3].rev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Sales & Services Revenue', '_2011': this.incomeSheet[0].salesServRev, '_2012': this.incomeSheet[1].salesServRev, '_2013': this.incomeSheet[2].salesServRev, '_2014': this.incomeSheet[3].salesServRev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Selling, General & Admin', '_2011': this.incomeSheet[0].sgAndAdmin, '_2012': this.incomeSheet[1].sgAndAdmin, '_2013': this.incomeSheet[2].sgAndAdmin, '_2014': this.incomeSheet[3].sgAndAdmin},
            // tslint:disable-next-line: max-line-length
            {metric: 'Discontinued Operations', '_2011': this.incomeSheet[0].discOps, '_2012': this.incomeSheet[1].discOps, '_2013': this.incomeSheet[2].discOps, '_2014': this.incomeSheet[3].discOps},
            // tslint:disable-next-line: max-line-length
            {metric: 'Foreign Exch (Gain) Loss', '_2011': this.incomeSheet[0].forex, '_2012': this.incomeSheet[1].forex, '_2013': this.incomeSheet[2].forex, '_2014': this.incomeSheet[3].forex}
        ];
        this.dataSource = new MatTableDataSource(this.INCOME_SHEET);
    }

}
