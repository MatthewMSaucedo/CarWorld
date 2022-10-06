import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BalanceSheet } from '../../../../server-communication/app-endpoint.constants';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'smt-balance-four',
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
export class SmtBalanceFourComponent implements OnInit {
    @Input() public balanceSheet;
    public BALANCE_SHEET;
    public displayedColumns: string[] = ['metric', '_2011', '_2012', '_2013', '_2014'];
    public dataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor() { }

    ngOnInit() {
        this.BALANCE_SHEET = [
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Assets', '_2011': this.balanceSheet[0].totalAssets1, '_2012': this.balanceSheet[1].totalAssets1, '_2013': this.balanceSheet[2].totalAssets1, '_2014': this.balanceSheet[3].totalAssets1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash & Cash Equivalents', '_2011': this.balanceSheet[0].cashEq, '_2012': this.balanceSheet[1].cashEq, '_2013': this.balanceSheet[2].cashEq, '_2014': this.balanceSheet[3].cashEq},
            // tslint:disable-next-line: max-line-length
            {metric: 'STI', '_2011': this.balanceSheet[0].sti, '_2012': this.balanceSheet[1].sti, '_2013': this.balanceSheet[2].sti, '_2014': this.balanceSheet[3].sti},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accounts & Notes Receivable', '_2011': this.balanceSheet[0].acctsRec, '_2012': this.balanceSheet[1].acctsRec, '_2013': this.balanceSheet[2].acctsRec, '_2014': this.balanceSheet[3].acctsRec},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accounts Receivable, Net', '_2011': this.balanceSheet[0].acctsRecNet, '_2012': this.balanceSheet[1].acctsRecNet, '_2013': this.balanceSheet[2].acctsRecNet, '_2014': this.balanceSheet[3].acctsRecNet},
            // tslint:disable-next-line: max-line-length
            {metric: 'Notes Receivable, Net', '_2011': this.balanceSheet[0].notesRecNet, '_2012': this.balanceSheet[1].notesRecNet, '_2013': this.balanceSheet[2].notesRecNet, '_2014': this.balanceSheet[3].notesRecNet},
            // tslint:disable-next-line: max-line-length
            {metric: 'Inventories', '_2011': this.balanceSheet[0].inv, '_2012': this.balanceSheet[1].inv, '_2013': this.balanceSheet[2].inv, '_2014': this.balanceSheet[3].inv},
            // tslint:disable-next-line: max-line-length
            {metric: 'Raw Materials', '_2011': this.balanceSheet[0].rawMat, '_2012': this.balanceSheet[1].rawMat, '_2013': this.balanceSheet[2].rawMat, '_2014': this.balanceSheet[3].rawMat},
            // tslint:disable-next-line: max-line-length
            {metric: 'Work In Process', '_2011': this.balanceSheet[0].wip, '_2012': this.balanceSheet[1].wip, '_2013': this.balanceSheet[2].wip, '_2014': this.balanceSheet[3].wip},
            // tslint:disable-next-line: max-line-length
            {metric: 'Finished Goods', '_2011': this.balanceSheet[0].finGoods, '_2012': this.balanceSheet[1].finGoods, '_2013': this.balanceSheet[2].finGoods, '_2014': this.balanceSheet[3].finGoods},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Inventory', '_2011': this.balanceSheet[0].othInv, '_2012': this.balanceSheet[1].othInv, '_2013': this.balanceSheet[2].othInv, '_2014': this.balanceSheet[3].othInv},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other ST Assets', '_2011': this.balanceSheet[0].othStAssets, '_2012': this.balanceSheet[1].othStAssets, '_2013': this.balanceSheet[2].othStAssets, '_2014': this.balanceSheet[3].othStAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Derivative & Hedging Assets', '_2011': this.balanceSheet[0].derivHedgeAssets1, '_2012': this.balanceSheet[1].derivHedgeAssets1, '_2013': this.balanceSheet[2].derivHedgeAssets1, '_2014': this.balanceSheet[3].derivHedgeAssets1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Taxes Receivable', '_2011': this.balanceSheet[0].taxesReciev, '_2012': this.balanceSheet[1].taxesReciev, '_2013': this.balanceSheet[2].taxesReciev, '_2014': this.balanceSheet[3].taxesReciev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Misc ST Assets', '_2011': this.balanceSheet[0].miscStAssets, '_2012': this.balanceSheet[1].miscStAssets, '_2013': this.balanceSheet[2].miscStAssets, '_2014': this.balanceSheet[3].miscStAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Current Assets', '_2011': this.balanceSheet[0].totalCurrAssets, '_2012': this.balanceSheet[1].totalCurrAssets, '_2013': this.balanceSheet[2].totalCurrAssets, '_2014': this.balanceSheet[3].totalCurrAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Property, Plant & Equip, Net', '_2011': this.balanceSheet[0].ppeNet, '_2012': this.balanceSheet[1].ppeNet, '_2013': this.balanceSheet[2].ppeNet, '_2014': this.balanceSheet[3].ppeNet},
            // tslint:disable-next-line: max-line-length
            {metric: 'Property, Plant & Equip', '_2011': this.balanceSheet[0].ppe, '_2012': this.balanceSheet[1].ppe, '_2013': this.balanceSheet[2].ppe, '_2014': this.balanceSheet[3].ppe},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accumulated Depreciation', '_2011': this.balanceSheet[0].accDeprec, '_2012': this.balanceSheet[1].accDeprec, '_2013': this.balanceSheet[2].accDeprec, '_2014': this.balanceSheet[3].accDeprec},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Investments & Receivables', '_2011': this.balanceSheet[0].ltiReceivables, '_2012': this.balanceSheet[1].ltiReceivables, '_2013': this.balanceSheet[2].ltiReceivables, '_2014': this.balanceSheet[3].ltiReceivables},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Investments', '_2011': this.balanceSheet[0].ltInvest, '_2012': this.balanceSheet[1].ltInvest, '_2013': this.balanceSheet[2].ltInvest, '_2014': this.balanceSheet[3].ltInvest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other LT Assets', '_2011': this.balanceSheet[0].othLtAssets, '_2012': this.balanceSheet[1].othLtAssets, '_2013': this.balanceSheet[2].othLtAssets, '_2014': this.balanceSheet[3].othLtAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Intangible Assets', '_2011': this.balanceSheet[0].totalIntAssets, '_2012': this.balanceSheet[1].totalIntAssets, '_2013': this.balanceSheet[2].totalIntAssets, '_2014': this.balanceSheet[3].totalIntAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Goodwill', '_2011': this.balanceSheet[0].goodwill, '_2012': this.balanceSheet[1].goodwill, '_2013': this.balanceSheet[2].goodwill, '_2014': this.balanceSheet[3].goodwill},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Intangible Assets', '_2011': this.balanceSheet[0].othIntAssets, '_2012': this.balanceSheet[1].othIntAssets, '_2013': this.balanceSheet[2].othIntAssets, '_2014': this.balanceSheet[3].othIntAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Prepaid Expense', '_2011': this.balanceSheet[0].prepaidExp, '_2012': this.balanceSheet[1].prepaidExp, '_2013': this.balanceSheet[2].prepaidExp, '_2014': this.balanceSheet[3].prepaidExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Tax Assets', '_2011': this.balanceSheet[0].deffTaxAssets, '_2012': this.balanceSheet[1].deffTaxAssets, '_2013': this.balanceSheet[2].deffTaxAssets, '_2014': this.balanceSheet[3].deffTaxAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Derivative & Hedging Assets', '_2011': this.balanceSheet[0].derivHedgeAssets2, '_2012': this.balanceSheet[1].derivHedgeAssets2, '_2013': this.balanceSheet[2].derivHedgeAssets2, '_2014': this.balanceSheet[3].derivHedgeAssets2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Misc LT Assets', '_2011': this.balanceSheet[0].miscAssets, '_2012': this.balanceSheet[1].miscAssets, '_2013': this.balanceSheet[2].miscAssets, '_2014': this.balanceSheet[3].miscAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Noncurrent Assets', '_2011': this.balanceSheet[0].totalNonCurrAssets, '_2012': this.balanceSheet[1].totalNonCurrAssets, '_2013': this.balanceSheet[2].totalNonCurrAssets, '_2014': this.balanceSheet[3].totalNonCurrAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Assets', '_2011': this.balanceSheet[0].totalAssets2, '_2012': this.balanceSheet[1].totalAssets2, '_2013': this.balanceSheet[2].totalAssets2, '_2014': this.balanceSheet[3].totalAssets2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Payables & Accruals', '_2011': this.balanceSheet[0].payablesAccruals, '_2012': this.balanceSheet[1].payablesAccruals, '_2013': this.balanceSheet[2].payablesAccruals, '_2014': this.balanceSheet[3].payablesAccruals},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accounts Payable', '_2011': this.balanceSheet[0].payables, '_2012': this.balanceSheet[1].payables, '_2013': this.balanceSheet[2].payables, '_2014': this.balanceSheet[3].payables},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accrued Taxes', '_2011': this.balanceSheet[0].accruedTaxes, '_2012': this.balanceSheet[1].accruedTaxes, '_2013': this.balanceSheet[2].accruedTaxes, '_2014': this.balanceSheet[3].accruedTaxes},
            // tslint:disable-next-line: max-line-length
            {metric: 'Interest & Dividends Payable', '_2011': this.balanceSheet[0].intDivsPayables, '_2012': this.balanceSheet[1].intDivsPayables, '_2013': this.balanceSheet[2].intDivsPayables, '_2014': this.balanceSheet[3].intDivsPayables},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Payables & Accruals', '_2011': this.balanceSheet[0].othPayablesAccurals, '_2012': this.balanceSheet[1].othPayablesAccurals, '_2013': this.balanceSheet[2].othPayablesAccurals, '_2014': this.balanceSheet[3].othPayablesAccurals},
            // tslint:disable-next-line: max-line-length
            {metric: 'ST Debt', '_2011': this.balanceSheet[0].stDebt, '_2012': this.balanceSheet[1].stDebt, '_2013': this.balanceSheet[2].stDebt, '_2014': this.balanceSheet[3].stDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'ST Borrowings', '_2011': this.balanceSheet[0].stBorrowings, '_2012': this.balanceSheet[1].stBorrowings, '_2013': this.balanceSheet[2].stBorrowings, '_2014': this.balanceSheet[3].stBorrowings},
            // tslint:disable-next-line: max-line-length
            {metric: 'ST Finance Leases', '_2011': this.balanceSheet[0].stFinLeases, '_2012': this.balanceSheet[1].stFinLeases, '_2013': this.balanceSheet[2].stFinLeases, '_2014': this.balanceSheet[3].stFinLeases},
            // tslint:disable-next-line: max-line-length
            {metric: 'ST Operating Leases', '_2011': this.balanceSheet[0].stOpLeases, '_2012': this.balanceSheet[1].stOpLeases, '_2013': this.balanceSheet[2].stOpLeases, '_2014': this.balanceSheet[3].stOpLeases},
            // tslint:disable-next-line: max-line-length
            {metric: 'Current Portion of LT Debt', '_2011': this.balanceSheet[0].currLtDebt, '_2012': this.balanceSheet[1].currLtDebt, '_2013': this.balanceSheet[2].currLtDebt, '_2014': this.balanceSheet[3].currLtDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other ST Liabilities', '_2011': this.balanceSheet[0].othStLiab, '_2012': this.balanceSheet[1].othStLiab, '_2013': this.balanceSheet[2].othStLiab, '_2014': this.balanceSheet[3].othStLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Revenue', '_2011': this.balanceSheet[0].deffRev1, '_2012': this.balanceSheet[1].deffRev1, '_2013': this.balanceSheet[2].deffRev1, '_2014': this.balanceSheet[3].deffRev1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Derivatives & Hedging', '_2011': this.balanceSheet[0].derivHedge1, '_2012': this.balanceSheet[1].derivHedge1, '_2013': this.balanceSheet[2].derivHedge1, '_2014': this.balanceSheet[3].derivHedge1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Misc ST Liabilities', '_2011': this.balanceSheet[0].miscStLiab, '_2012': this.balanceSheet[1].miscStLiab, '_2013': this.balanceSheet[2].miscStLiab, '_2014': this.balanceSheet[3].miscStLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Current Liabilities', '_2011': this.balanceSheet[0].totalCurrLiab, '_2012': this.balanceSheet[1].totalCurrLiab, '_2013': this.balanceSheet[2].totalCurrLiab, '_2014': this.balanceSheet[3].totalCurrLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Debt', '_2011': this.balanceSheet[0].ltDebt, '_2012': this.balanceSheet[1].ltDebt, '_2013': this.balanceSheet[2].ltDebt, '_2014': this.balanceSheet[3].ltDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Borrowings', '_2011': this.balanceSheet[0].ltBorrow, '_2012': this.balanceSheet[1].ltBorrow, '_2013': this.balanceSheet[2].ltBorrow, '_2014': this.balanceSheet[3].ltBorrow},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Finance Leases', '_2011': this.balanceSheet[0].ltFinLeases, '_2012': this.balanceSheet[1].ltFinLeases, '_2013': this.balanceSheet[2].ltFinLeases, '_2014': this.balanceSheet[3].ltFinLeases},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Operating Leases', '_2011': this.balanceSheet[0].ltOpLeases, '_2012': this.balanceSheet[1].ltOpLeases, '_2013': this.balanceSheet[2].ltOpLeases, '_2014': this.balanceSheet[3].ltOpLeases},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other LT Liabilities', '_2011': this.balanceSheet[0].othLtLiab, '_2012': this.balanceSheet[1].othLtLiab, '_2013': this.balanceSheet[2].othLtLiab, '_2014': this.balanceSheet[3].othLtLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accrued Liabilities', '_2011': this.balanceSheet[0].accuredLiab, '_2012': this.balanceSheet[1].accuredLiab, '_2013': this.balanceSheet[2].accuredLiab, '_2014': this.balanceSheet[3].accuredLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Pension Liabilities', '_2011': this.balanceSheet[0].pensionLiab, '_2012': this.balanceSheet[1].pensionLiab, '_2013': this.balanceSheet[2].pensionLiab, '_2014': this.balanceSheet[3].pensionLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Pensions', '_2011': this.balanceSheet[0].pensions, '_2012': this.balanceSheet[1].pensions, '_2013': this.balanceSheet[2].pensions, '_2014': this.balanceSheet[3].pensions},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Post-Ret Benefits', '_2011': this.balanceSheet[0].othPostRetBen, '_2012': this.balanceSheet[1].othPostRetBen, '_2013': this.balanceSheet[2].othPostRetBen, '_2014': this.balanceSheet[3].othPostRetBen},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Revenue', '_2011': this.balanceSheet[0].deffRev2, '_2012': this.balanceSheet[1].deffRev2, '_2013': this.balanceSheet[2].deffRev2, '_2014': this.balanceSheet[3].deffRev2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Tax Liabilities', '_2011': this.balanceSheet[0].defTabLiab, '_2012': this.balanceSheet[1].defTabLiab, '_2013': this.balanceSheet[2].defTabLiab, '_2014': this.balanceSheet[3].defTabLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Derivatives & Hedging', '_2011': this.balanceSheet[0].derivHedge, '_2012': this.balanceSheet[1].derivHedge, '_2013': this.balanceSheet[2].derivHedge, '_2014': this.balanceSheet[3].derivHedge},
            // tslint:disable-next-line: max-line-length
            {metric: 'Misc LT Liabilities', '_2011': this.balanceSheet[0].miscLtLiab, '_2012': this.balanceSheet[1].miscLtLiab, '_2013': this.balanceSheet[2].miscLtLiab, '_2014': this.balanceSheet[3].miscLtLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Noncurrent Liabilities', '_2011': this.balanceSheet[0].totalNonCurrLiab, '_2012': this.balanceSheet[1].totalNonCurrLiab, '_2013': this.balanceSheet[2].totalNonCurrLiab, '_2014': this.balanceSheet[3].totalNonCurrLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Liabilities', '_2011': this.balanceSheet[0].totalLiab, '_2012': this.balanceSheet[1].totalLiab, '_2013': this.balanceSheet[2].totalLiab, '_2014': this.balanceSheet[3].totalLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Preferred Equity and Hybrid Capital', '_2011': this.balanceSheet[0].prefEquityHybridCap, '_2012': this.balanceSheet[1].prefEquityHybridCap, '_2013': this.balanceSheet[2].prefEquityHybridCap, '_2014': this.balanceSheet[3].prefEquityHybridCap},
            // tslint:disable-next-line: max-line-length
            {metric: 'Share Capital & APIC', '_2011': this.balanceSheet[0].shareCapApic, '_2012': this.balanceSheet[1].shareCapApic, '_2013': this.balanceSheet[2].shareCapApic, '_2014': this.balanceSheet[3].shareCapApic},
            // tslint:disable-next-line: max-line-length
            {metric: 'Common Stock', '_2011': this.balanceSheet[0].commonStock, '_2012': this.balanceSheet[1].commonStock, '_2013': this.balanceSheet[2].commonStock, '_2014': this.balanceSheet[3].commonStock},
            // tslint:disable-next-line: max-line-length
            {metric: 'Additional Paid in Capital', '_2011': this.balanceSheet[0].addPaidCap, '_2012': this.balanceSheet[1].addPaidCap, '_2013': this.balanceSheet[2].addPaidCap, '_2014': this.balanceSheet[3].addPaidCap},
            // tslint:disable-next-line: max-line-length
            {metric: 'Treasury Stock', '_2011': this.balanceSheet[0].treasuryStock, '_2012': this.balanceSheet[1].treasuryStock, '_2013': this.balanceSheet[2].treasuryStock, '_2014': this.balanceSheet[3].treasuryStock},
            // tslint:disable-next-line: max-line-length
            {metric: 'Retained Earnings', '_2011': this.balanceSheet[0].re, '_2012': this.balanceSheet[1].re, '_2013': this.balanceSheet[2].re, '_2014': this.balanceSheet[3].re},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Equity', '_2011': this.balanceSheet[0].othEquity, '_2012': this.balanceSheet[1].othEquity, '_2013': this.balanceSheet[2].othEquity, '_2014': this.balanceSheet[3].othEquity},
            // tslint:disable-next-line: max-line-length
            {metric: 'Equity Before Minority Interest', '_2011': this.balanceSheet[0].equityBeforeMinInt, '_2012': this.balanceSheet[1].equityBeforeMinInt, '_2013': this.balanceSheet[2].equityBeforeMinInt, '_2014': this.balanceSheet[3].equityBeforeMinInt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Minority/Non Controlling Interest', '_2011': this.balanceSheet[0].minNonControlInt, '_2012': this.balanceSheet[1].minNonControlInt, '_2013': this.balanceSheet[2].minNonControlInt, '_2014': this.balanceSheet[3].minNonControlInt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Equity', '_2011': this.balanceSheet[0].totalEquity, '_2012': this.balanceSheet[1].totalEquity, '_2013': this.balanceSheet[2].totalEquity, '_2014': this.balanceSheet[3].totalEquity},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Liabilities & Equity', '_2011': this.balanceSheet[0].liabAndEquity, '_2012': this.balanceSheet[1].liabAndEquity, '_2013': this.balanceSheet[2].liabAndEquity, '_2014': this.balanceSheet[3].liabAndEquity},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Current Liabilities', '_2011': this.balanceSheet[0].totalCurrLiab, '_2012': this.balanceSheet[1].totalCurrLiab, '_2013': this.balanceSheet[2].totalCurrLiab, '_2014': this.balanceSheet[3].totalCurrLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Debt', '_2011': this.balanceSheet[0].ltDebt, '_2012': this.balanceSheet[1].ltDebt, '_2013': this.balanceSheet[2].ltDebt, '_2014': this.balanceSheet[3].ltDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Borrowings', '_2011': this.balanceSheet[0].ltBorrow, '_2012': this.balanceSheet[1].ltBorrow, '_2013': this.balanceSheet[2].ltBorrow, '_2014': this.balanceSheet[3].ltBorrow}
        ];
        this.dataSource = new MatTableDataSource(this.BALANCE_SHEET);
    }

}
