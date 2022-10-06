import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IncomeSheet } from '../../../../server-communication/app-endpoint.constants';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'smt-income-three',
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
export class SmtIncomeThreeComponent implements OnInit {
    @Input() public incomeSheet;
    public INCOME_SHEET;
    public displayedColumns: string[] = ['metric', '_2007', '_2008', '_2009', '_2010'];
    public dataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor() { }

    ngOnInit() {
        this.INCOME_SHEET = [
            // tslint:disable-next-line: max-line-length
            {metric: 'Income Tax', '_2007': this.incomeSheet[0].IncTax, '_2008': this.incomeSheet[1].IncTax, '_2009': this.incomeSheet[2].IncTax, '_2010': this.incomeSheet[3].IncTax},
            // tslint:disable-next-line: max-line-length
            {metric: 'X0 & Accounting Changes', '_2007': this.incomeSheet[0].acctChng, '_2008': this.incomeSheet[1].acctChng, '_2009': this.incomeSheet[2].acctChng, '_2010': this.incomeSheet[3].acctChng},
            // tslint:disable-next-line: max-line-length
            {metric: '(Income) Loss from Affiliates', '_2007': this.incomeSheet[0].affiliates, '_2008': this.incomeSheet[1].affiliates, '_2009': this.incomeSheet[2].affiliates, '_2010': this.incomeSheet[3].affiliates},
            // tslint:disable-next-line: max-line-length
            {metric: 'Basic Weighted Avg Shares', '_2007': this.incomeSheet[0].basicWeightAvgShares, '_2008': this.incomeSheet[1].basicWeightAvgShares, '_2009': this.incomeSheet[2].basicWeightAvgShares, '_2010': this.incomeSheet[3].basicWeightAvgShares},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cost of Goods & Services', '_2007': this.incomeSheet[0].cogs, '_2008': this.incomeSheet[1].cogs, '_2009': this.incomeSheet[2].cogs, '_2010': this.incomeSheet[3].cogs},
            // tslint:disable-next-line: max-line-length
            {metric: 'Income (Loss) from Cont Ops', '_2007': this.incomeSheet[0].contOps, '_2008': this.incomeSheet[1].contOps, '_2009': this.incomeSheet[2].contOps, '_2010': this.incomeSheet[3].contOps},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cost of Revenue', '_2007': this.incomeSheet[0].costOfRev, '_2008': this.incomeSheet[1].costOfRev, '_2009': this.incomeSheet[2].costOfRev, '_2010': this.incomeSheet[3].costOfRev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Current Income Tax', '_2007': this.incomeSheet[0].currIncTax, '_2008': this.incomeSheet[1].currIncTax, '_2009': this.incomeSheet[2].currIncTax, '_2010': this.incomeSheet[3].currIncTax},
            // tslint:disable-next-line: max-line-length
            {metric: 'Diluted Weighted Avg Shares', '_2007': this.incomeSheet[0].dilWeightAvgShares, '_2008': this.incomeSheet[1].dilWeightAvgShares, '_2009': this.incomeSheet[2].dilWeightAvgShares, '_2010': this.incomeSheet[3].dilWeightAvgShares},
            // tslint:disable-next-line: max-line-length
            {metric: 'Discontinued Operations', '_2007': this.incomeSheet[0].discOps, '_2008': this.incomeSheet[1].discOps, '_2009': this.incomeSheet[2].discOps, '_2010': this.incomeSheet[3].discOps},
            // tslint:disable-next-line: max-line-length
            {metric: 'Foreign Exch (Gain) Loss', '_2007': this.incomeSheet[0].forex, '_2008': this.incomeSheet[1].forex, '_2009': this.incomeSheet[2].forex, '_2010': this.incomeSheet[3].forex},
            // tslint:disable-next-line: max-line-length
            {metric: 'Income (Loss) Incl. MI', '_2007': this.incomeSheet[0].incomeMi, '_2008': this.incomeSheet[1].incomeMi, '_2009': this.incomeSheet[2].incomeMi, '_2010': this.incomeSheet[3].incomeMi},
            // tslint:disable-next-line: max-line-length
            {metric: 'Interest Expense', '_2007': this.incomeSheet[0].intExp, '_2008': this.incomeSheet[1].intExp, '_2009': this.incomeSheet[2].intExp, '_2010': this.incomeSheet[3].intExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Minority Interest', '_2007': this.incomeSheet[0].minInterest, '_2008': this.incomeSheet[1].minInterest, '_2009': this.incomeSheet[2].minInterest, '_2010': this.incomeSheet[3].minInterest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Abnormal Losses (Gains)', '_2007': this.incomeSheet[0].netAbnormal, '_2008': this.incomeSheet[1].netAbnormal, '_2009': this.incomeSheet[2].netAbnormal, '_2010': this.incomeSheet[3].netAbnormal},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Extraordinary Losses (Gains)', '_2007': this.incomeSheet[0].netExtra1, '_2008': this.incomeSheet[1].netExtra1, '_2009': this.incomeSheet[2].netExtra1, '_2010': this.incomeSheet[3].netExtra1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Interest Expense, Net', '_2007': this.incomeSheet[0].netIntExp, '_2008': this.incomeSheet[1].netIntExp, '_2009': this.incomeSheet[2].netIntExp, '_2010': this.incomeSheet[3].netIntExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income Avail to Common, Adj', '_2007': this.incomeSheet[0].niAvailCommonAdj, '_2008': this.incomeSheet[1].niAvailCommonAdj, '_2009': this.incomeSheet[2].niAvailCommonAdj, '_2010': this.incomeSheet[3].niAvailCommonAdj},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income Avail to Common, GAAP', '_2007': this.incomeSheet[0].niAvailCommonGaap, '_2008': this.incomeSheet[1].niAvailCommonGaap, '_2009': this.incomeSheet[2].niAvailCommonGaap, '_2010': this.incomeSheet[3].niAvailCommonGaap},
            // tslint:disable-next-line: max-line-length
            {metric: 'Net Income, GAAP', '_2007': this.incomeSheet[0].niInc, '_2008': this.incomeSheet[1].niInc, '_2009': this.incomeSheet[2].niInc, '_2010': this.incomeSheet[3].niInc},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Non-Op (Income) Loss', '_2007': this.incomeSheet[0].nonOpInc, '_2008': this.incomeSheet[1].nonOpInc, '_2009': this.incomeSheet[2].nonOpInc, '_2010': this.incomeSheet[3].nonOpInc},
            // tslint:disable-next-line: max-line-length
            {metric: 'Non-Operating (Income) Loss', '_2007': this.incomeSheet[0].nonOpIncLoss, '_2008': this.incomeSheet[1].nonOpIncLoss, '_2009': this.incomeSheet[2].nonOpIncLoss, '_2010': this.incomeSheet[3].nonOpIncLoss},
            // tslint:disable-next-line: max-line-length
            {metric: 'Operating Expenses', '_2007': this.incomeSheet[0].opExp, '_2008': this.incomeSheet[1].opExp, '_2009': this.incomeSheet[2].opExp, '_2010': this.incomeSheet[3].opExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Adjustments', '_2007': this.incomeSheet[0].othAdj, '_2008': this.incomeSheet[1].othAdj, '_2009': this.incomeSheet[2].othAdj, '_2010': this.incomeSheet[3].othAdj},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Operating Expense', '_2007': this.incomeSheet[0].othOpExp, '_2008': this.incomeSheet[1].othOpExp, '_2009': this.incomeSheet[2].othOpExp, '_2010': this.incomeSheet[3].othOpExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Operating Income', '_2007': this.incomeSheet[0].otherProfit, '_2008': this.incomeSheet[1].otherProfit, '_2009': this.incomeSheet[2].otherProfit, '_2010': this.incomeSheet[3].otherProfit},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Revenue', '_2007': this.incomeSheet[0].otherRev, '_2008': this.incomeSheet[1].otherRev, '_2009': this.incomeSheet[2].otherRev, '_2010': this.incomeSheet[3].otherRev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Preferred Dividends', '_2007': this.incomeSheet[0].prefDivs, '_2008': this.incomeSheet[1].prefDivs, '_2009': this.incomeSheet[2].prefDivs, '_2010': this.incomeSheet[3].prefDivs},
            // tslint:disable-next-line: max-line-length
            {metric: 'Pretax Income', '_2007': this.incomeSheet[0].pretaxIncome, '_2008': this.incomeSheet[1].pretaxIncome, '_2009': this.incomeSheet[2].pretaxIncome, '_2010': this.incomeSheet[3].pretaxIncome},
            // tslint:disable-next-line: max-line-length
            {metric: 'Gross Profit', '_2007': this.incomeSheet[0].proft, '_2008': this.incomeSheet[1].profit, '_2009': this.incomeSheet[2].profit, '_2010': this.incomeSheet[3].profit},
            // tslint:disable-next-line: max-line-length
            {metric: 'Revenue', '_2007': this.incomeSheet[0].rev, '_2008': this.incomeSheet[1].rev, '_2009': this.incomeSheet[2].rev, '_2010': this.incomeSheet[3].rev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Sales & Services Revenue', '_2007': this.incomeSheet[0].salesServRev, '_2008': this.incomeSheet[1].salesServRev, '_2009': this.incomeSheet[2].salesServRev, '_2010': this.incomeSheet[3].salesServRev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Selling, General & Admin', '_2007': this.incomeSheet[0].sgAndAdmin, '_2008': this.incomeSheet[1].sgAndAdmin, '_2009': this.incomeSheet[2].sgAndAdmin, '_2010': this.incomeSheet[3].sgAndAdmin},
            // tslint:disable-next-line: max-line-length
            {metric: 'Discontinued Operations', '_2007': this.incomeSheet[0].discOps, '_2008': this.incomeSheet[1].discOps, '_2009': this.incomeSheet[2].discOps, '_2010': this.incomeSheet[3].discOps},
            // tslint:disable-next-line: max-line-length
            {metric: 'Foreign Exch (Gain) Loss', '_2007': this.incomeSheet[0].forex, '_2008': this.incomeSheet[1].forex, '_2009': this.incomeSheet[2].forex, '_2010': this.incomeSheet[3].forex}
        ];
        this.dataSource = new MatTableDataSource(this.INCOME_SHEET);
    }

}
