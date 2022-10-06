import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BalanceSheet } from '../../../../server-communication/app-endpoint.constants';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'smt-balance-one',
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
export class SmtBalanceOneComponent implements OnInit {
    @Input() public balanceSheet;
    public BALANCE_SHEET;
    public displayedColumns: string[] = ['metric', '_1999', '_2000', '_2001', '_2002'];
    public dataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor() { }

    ngOnInit() {
        this.BALANCE_SHEET = [
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Assets', '_1999': this.balanceSheet[0].totalAssets1, '_2000': this.balanceSheet[1].totalAssets1, '_2001': this.balanceSheet[2].totalAssets1, '_2002': this.balanceSheet[3].totalAssets1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Cash & Cash Equivalents', '_1999': this.balanceSheet[0].cashEq, '_2000': this.balanceSheet[1].cashEq, '_2001': this.balanceSheet[2].cashEq, '_2002': this.balanceSheet[3].cashEq},
            // tslint:disable-next-line: max-line-length
            {metric: 'STI', '_1999': this.balanceSheet[0].sti, '_2000': this.balanceSheet[1].sti, '_2001': this.balanceSheet[2].sti, '_2002': this.balanceSheet[3].sti},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accounts & Notes Receivable', '_1999': this.balanceSheet[0].acctsRec, '_2000': this.balanceSheet[1].acctsRec, '_2001': this.balanceSheet[2].acctsRec, '_2002': this.balanceSheet[3].acctsRec},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accounts Receivable, Net', '_1999': this.balanceSheet[0].acctsRecNet, '_2000': this.balanceSheet[1].acctsRecNet, '_2001': this.balanceSheet[2].acctsRecNet, '_2002': this.balanceSheet[3].acctsRecNet},
            // tslint:disable-next-line: max-line-length
            {metric: 'Notes Receivable, Net', '_1999': this.balanceSheet[0].notesRecNet, '_2000': this.balanceSheet[1].notesRecNet, '_2001': this.balanceSheet[2].notesRecNet, '_2002': this.balanceSheet[3].notesRecNet},
            // tslint:disable-next-line: max-line-length
            {metric: 'Inventories', '_1999': this.balanceSheet[0].inv, '_2000': this.balanceSheet[1].inv, '_2001': this.balanceSheet[2].inv, '_2002': this.balanceSheet[3].inv},
            // tslint:disable-next-line: max-line-length
            {metric: 'Raw Materials', '_1999': this.balanceSheet[0].rawMat, '_2000': this.balanceSheet[1].rawMat, '_2001': this.balanceSheet[2].rawMat, '_2002': this.balanceSheet[3].rawMat},
            // tslint:disable-next-line: max-line-length
            {metric: 'Work In Process', '_1999': this.balanceSheet[0].wip, '_2000': this.balanceSheet[1].wip, '_2001': this.balanceSheet[2].wip, '_2002': this.balanceSheet[3].wip},
            // tslint:disable-next-line: max-line-length
            {metric: 'Finished Goods', '_1999': this.balanceSheet[0].finGoods, '_2000': this.balanceSheet[1].finGoods, '_2001': this.balanceSheet[2].finGoods, '_2002': this.balanceSheet[3].finGoods},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Inventory', '_1999': this.balanceSheet[0].othInv, '_2000': this.balanceSheet[1].othInv, '_2001': this.balanceSheet[2].othInv, '_2002': this.balanceSheet[3].othInv},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other ST Assets', '_1999': this.balanceSheet[0].othStAssets, '_2000': this.balanceSheet[1].othStAssets, '_2001': this.balanceSheet[2].othStAssets, '_2002': this.balanceSheet[3].othStAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Derivative & Hedging Assets', '_1999': this.balanceSheet[0].derivHedgeAssets1, '_2000': this.balanceSheet[1].derivHedgeAssets1, '_2001': this.balanceSheet[2].derivHedgeAssets1, '_2002': this.balanceSheet[3].derivHedgeAssets1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Taxes Receivable', '_1999': this.balanceSheet[0].taxesReciev, '_2000': this.balanceSheet[1].taxesReciev, '_2001': this.balanceSheet[2].taxesReciev, '_2002': this.balanceSheet[3].taxesReciev},
            // tslint:disable-next-line: max-line-length
            {metric: 'Misc ST Assets', '_1999': this.balanceSheet[0].miscStAssets, '_2000': this.balanceSheet[1].miscStAssets, '_2001': this.balanceSheet[2].miscStAssets, '_2002': this.balanceSheet[3].miscStAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Current Assets', '_1999': this.balanceSheet[0].totalCurrAssets, '_2000': this.balanceSheet[1].totalCurrAssets, '_2001': this.balanceSheet[2].totalCurrAssets, '_2002': this.balanceSheet[3].totalCurrAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Property, Plant & Equip, Net', '_1999': this.balanceSheet[0].ppeNet, '_2000': this.balanceSheet[1].ppeNet, '_2001': this.balanceSheet[2].ppeNet, '_2002': this.balanceSheet[3].ppeNet},
            // tslint:disable-next-line: max-line-length
            {metric: 'Property, Plant & Equip', '_1999': this.balanceSheet[0].ppe, '_2000': this.balanceSheet[1].ppe, '_2001': this.balanceSheet[2].ppe, '_2002': this.balanceSheet[3].ppe},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accumulated Depreciation', '_1999': this.balanceSheet[0].accDeprec, '_2000': this.balanceSheet[1].accDeprec, '_2001': this.balanceSheet[2].accDeprec, '_2002': this.balanceSheet[3].accDeprec},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Investments & Receivables', '_1999': this.balanceSheet[0].ltiReceivables, '_2000': this.balanceSheet[1].ltiReceivables, '_2001': this.balanceSheet[2].ltiReceivables, '_2002': this.balanceSheet[3].ltiReceivables},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Investments', '_1999': this.balanceSheet[0].ltInvest, '_2000': this.balanceSheet[1].ltInvest, '_2001': this.balanceSheet[2].ltInvest, '_2002': this.balanceSheet[3].ltInvest},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other LT Assets', '_1999': this.balanceSheet[0].othLtAssets, '_2000': this.balanceSheet[1].othLtAssets, '_2001': this.balanceSheet[2].othLtAssets, '_2002': this.balanceSheet[3].othLtAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Intangible Assets', '_1999': this.balanceSheet[0].totalIntAssets, '_2000': this.balanceSheet[1].totalIntAssets, '_2001': this.balanceSheet[2].totalIntAssets, '_2002': this.balanceSheet[3].totalIntAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Goodwill', '_1999': this.balanceSheet[0].goodwill, '_2000': this.balanceSheet[1].goodwill, '_2001': this.balanceSheet[2].goodwill, '_2002': this.balanceSheet[3].goodwill},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Intangible Assets', '_1999': this.balanceSheet[0].othIntAssets, '_2000': this.balanceSheet[1].othIntAssets, '_2001': this.balanceSheet[2].othIntAssets, '_2002': this.balanceSheet[3].othIntAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Prepaid Expense', '_1999': this.balanceSheet[0].prepaidExp, '_2000': this.balanceSheet[1].prepaidExp, '_2001': this.balanceSheet[2].prepaidExp, '_2002': this.balanceSheet[3].prepaidExp},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Tax Assets', '_1999': this.balanceSheet[0].deffTaxAssets, '_2000': this.balanceSheet[1].deffTaxAssets, '_2001': this.balanceSheet[2].deffTaxAssets, '_2002': this.balanceSheet[3].deffTaxAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Derivative & Hedging Assets', '_1999': this.balanceSheet[0].derivHedgeAssets2, '_2000': this.balanceSheet[1].derivHedgeAssets2, '_2001': this.balanceSheet[2].derivHedgeAssets2, '_2002': this.balanceSheet[3].derivHedgeAssets2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Misc LT Assets', '_1999': this.balanceSheet[0].miscAssets, '_2000': this.balanceSheet[1].miscAssets, '_2001': this.balanceSheet[2].miscAssets, '_2002': this.balanceSheet[3].miscAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Noncurrent Assets', '_1999': this.balanceSheet[0].totalNonCurrAssets, '_2000': this.balanceSheet[1].totalNonCurrAssets, '_2001': this.balanceSheet[2].totalNonCurrAssets, '_2002': this.balanceSheet[3].totalNonCurrAssets},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Assets', '_1999': this.balanceSheet[0].totalAssets2, '_2000': this.balanceSheet[1].totalAssets2, '_2001': this.balanceSheet[2].totalAssets2, '_2002': this.balanceSheet[3].totalAssets2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Payables & Accruals', '_1999': this.balanceSheet[0].payablesAccruals, '_2000': this.balanceSheet[1].payablesAccruals, '_2001': this.balanceSheet[2].payablesAccruals, '_2002': this.balanceSheet[3].payablesAccruals},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accounts Payable', '_1999': this.balanceSheet[0].payables, '_2000': this.balanceSheet[1].payables, '_2001': this.balanceSheet[2].payables, '_2002': this.balanceSheet[3].payables},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accrued Taxes', '_1999': this.balanceSheet[0].accruedTaxes, '_2000': this.balanceSheet[1].accruedTaxes, '_2001': this.balanceSheet[2].accruedTaxes, '_2002': this.balanceSheet[3].accruedTaxes},
            // tslint:disable-next-line: max-line-length
            {metric: 'Interest & Dividends Payable', '_1999': this.balanceSheet[0].intDivsPayables, '_2000': this.balanceSheet[1].intDivsPayables, '_2001': this.balanceSheet[2].intDivsPayables, '_2002': this.balanceSheet[3].intDivsPayables},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Payables & Accruals', '_1999': this.balanceSheet[0].othPayablesAccurals, '_2000': this.balanceSheet[1].othPayablesAccurals, '_2001': this.balanceSheet[2].othPayablesAccurals, '_2002': this.balanceSheet[3].othPayablesAccurals},
            // tslint:disable-next-line: max-line-length
            {metric: 'ST Debt', '_1999': this.balanceSheet[0].stDebt, '_2000': this.balanceSheet[1].stDebt, '_2001': this.balanceSheet[2].stDebt, '_2002': this.balanceSheet[3].stDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'ST Borrowings', '_1999': this.balanceSheet[0].stBorrowings, '_2000': this.balanceSheet[1].stBorrowings, '_2001': this.balanceSheet[2].stBorrowings, '_2002': this.balanceSheet[3].stBorrowings},
            // tslint:disable-next-line: max-line-length
            {metric: 'ST Finance Leases', '_1999': this.balanceSheet[0].stFinLeases, '_2000': this.balanceSheet[1].stFinLeases, '_2001': this.balanceSheet[2].stFinLeases, '_2002': this.balanceSheet[3].stFinLeases},
            // tslint:disable-next-line: max-line-length
            {metric: 'ST Operating Leases', '_1999': this.balanceSheet[0].stOpLeases, '_2000': this.balanceSheet[1].stOpLeases, '_2001': this.balanceSheet[2].stOpLeases, '_2002': this.balanceSheet[3].stOpLeases},
            // tslint:disable-next-line: max-line-length
            {metric: 'Current Portion of LT Debt', '_1999': this.balanceSheet[0].currLtDebt, '_2000': this.balanceSheet[1].currLtDebt, '_2001': this.balanceSheet[2].currLtDebt, '_2002': this.balanceSheet[3].currLtDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other ST Liabilities', '_1999': this.balanceSheet[0].othStLiab, '_2000': this.balanceSheet[1].othStLiab, '_2001': this.balanceSheet[2].othStLiab, '_2002': this.balanceSheet[3].othStLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Revenue', '_1999': this.balanceSheet[0].deffRev1, '_2000': this.balanceSheet[1].deffRev1, '_2001': this.balanceSheet[2].deffRev1, '_2002': this.balanceSheet[3].deffRev1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Derivatives & Hedging', '_1999': this.balanceSheet[0].derivHedge1, '_2000': this.balanceSheet[1].derivHedge1, '_2001': this.balanceSheet[2].derivHedge1, '_2002': this.balanceSheet[3].derivHedge1},
            // tslint:disable-next-line: max-line-length
            {metric: 'Misc ST Liabilities', '_1999': this.balanceSheet[0].miscStLiab, '_2000': this.balanceSheet[1].miscStLiab, '_2001': this.balanceSheet[2].miscStLiab, '_2002': this.balanceSheet[3].miscStLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Current Liabilities', '_1999': this.balanceSheet[0].totalCurrLiab, '_2000': this.balanceSheet[1].totalCurrLiab, '_2001': this.balanceSheet[2].totalCurrLiab, '_2002': this.balanceSheet[3].totalCurrLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Debt', '_1999': this.balanceSheet[0].ltDebt, '_2000': this.balanceSheet[1].ltDebt, '_2001': this.balanceSheet[2].ltDebt, '_2002': this.balanceSheet[3].ltDebt},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Borrowings', '_1999': this.balanceSheet[0].ltBorrow, '_2000': this.balanceSheet[1].ltBorrow, '_2001': this.balanceSheet[2].ltBorrow, '_2002': this.balanceSheet[3].ltBorrow},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Finance Leases', '_1999': this.balanceSheet[0].ltFinLeases, '_2000': this.balanceSheet[1].ltFinLeases, '_2001': this.balanceSheet[2].ltFinLeases, '_2002': this.balanceSheet[3].ltFinLeases},
            // tslint:disable-next-line: max-line-length
            {metric: 'LT Operating Leases', '_1999': this.balanceSheet[0].ltOpLeases, '_2000': this.balanceSheet[1].ltOpLeases, '_2001': this.balanceSheet[2].ltOpLeases, '_2002': this.balanceSheet[3].ltOpLeases},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other LT Liabilities', '_1999': this.balanceSheet[0].othLtLiab, '_2000': this.balanceSheet[1].othLtLiab, '_2001': this.balanceSheet[2].othLtLiab, '_2002': this.balanceSheet[3].othLtLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accrued Liabilities', '_1999': this.balanceSheet[0].accuredLiab, '_2000': this.balanceSheet[1].accuredLiab, '_2001': this.balanceSheet[2].accuredLiab, '_2002': this.balanceSheet[3].accuredLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Pension Liabilities', '_1999': this.balanceSheet[0].pensionLiab, '_2000': this.balanceSheet[1].pensionLiab, '_2001': this.balanceSheet[2].pensionLiab, '_2002': this.balanceSheet[3].pensionLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Pensions', '_1999': this.balanceSheet[0].pensions, '_2000': this.balanceSheet[1].pensions, '_2001': this.balanceSheet[2].pensions, '_2002': this.balanceSheet[3].pensions},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Post-Ret Benefits', '_1999': this.balanceSheet[0].othPostRetBen, '_2000': this.balanceSheet[1].othPostRetBen, '_2001': this.balanceSheet[2].othPostRetBen, '_2002': this.balanceSheet[3].othPostRetBen},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Revenue', '_1999': this.balanceSheet[0].deffRev2, '_2000': this.balanceSheet[1].deffRev2, '_2001': this.balanceSheet[2].deffRev2, '_2002': this.balanceSheet[3].deffRev2},
            // tslint:disable-next-line: max-line-length
            {metric: 'Deferred Tax Liabilities', '_1999': this.balanceSheet[0].defTabLiab, '_2000': this.balanceSheet[1].defTabLiab, '_2001': this.balanceSheet[2].defTabLiab, '_2002': this.balanceSheet[3].defTabLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Derivatives & Hedging', '_1999': this.balanceSheet[0].derivHedge, '_2000': this.balanceSheet[1].derivHedge, '_2001': this.balanceSheet[2].derivHedge, '_2002': this.balanceSheet[3].derivHedge},
            // tslint:disable-next-line: max-line-length
            {metric: 'Misc LT Liabilities', '_1999': this.balanceSheet[0].miscLtLiab, '_2000': this.balanceSheet[1].miscLtLiab, '_2001': this.balanceSheet[2].miscLtLiab, '_2002': this.balanceSheet[3].miscLtLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Noncurrent Liabilities', '_1999': this.balanceSheet[0].totalNonCurrLiab, '_2000': this.balanceSheet[1].totalNonCurrLiab, '_2001': this.balanceSheet[2].totalNonCurrLiab, '_2002': this.balanceSheet[3].totalNonCurrLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Liabilities', '_1999': this.balanceSheet[0].totalLiab, '_2000': this.balanceSheet[1].totalLiab, '_2001': this.balanceSheet[2].totalLiab, '_2002': this.balanceSheet[3].totalLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Preferred Equity and Hybrid Capital', '_1999': this.balanceSheet[0].prefEquityHybridCap, '_2000': this.balanceSheet[1].prefEquityHybridCap, '_2001': this.balanceSheet[2].prefEquityHybridCap, '_2002': this.balanceSheet[3].prefEquityHybridCap},
            // tslint:disable-next-line: max-line-length
            {metric: 'Share Capital & APIC', '_1999': this.balanceSheet[0].shareCapApic, '_2000': this.balanceSheet[1].shareCapApic, '_2001': this.balanceSheet[2].shareCapApic, '_2002': this.balanceSheet[3].shareCapApic},
            // tslint:disable-next-line: max-line-length
            {metric: 'Common Stock', '_1999': this.balanceSheet[0].commonStock, '_2000': this.balanceSheet[1].commonStock, '_2001': this.balanceSheet[2].commonStock, '_2002': this.balanceSheet[3].commonStock},
            // tslint:disable-next-line: max-line-length
            {metric: 'Additional Paid in Capital', '_1999': this.balanceSheet[0].addPaidCap, '_2000': this.balanceSheet[1].addPaidCap, '_2001': this.balanceSheet[2].addPaidCap, '_2002': this.balanceSheet[3].addPaidCap},
            // tslint:disable-next-line: max-line-length
            {metric: 'Treasury Stock', '_1999': this.balanceSheet[0].treasuryStock, '_2000': this.balanceSheet[1].treasuryStock, '_2001': this.balanceSheet[2].treasuryStock, '_2002': this.balanceSheet[3].treasuryStock},
            // tslint:disable-next-line: max-line-length
            {metric: 'Retained Earnings', '_1999': this.balanceSheet[0].re, '_2000': this.balanceSheet[1].re, '_2001': this.balanceSheet[2].re, '_2002': this.balanceSheet[3].re},
            // tslint:disable-next-line: max-line-length
            {metric: 'Other Equity', '_1999': this.balanceSheet[0].othEquity, '_2000': this.balanceSheet[1].othEquity, '_2001': this.balanceSheet[2].othEquity, '_2002': this.balanceSheet[3].othEquity},
            // tslint:disable-next-line: max-line-length
            {metric: 'Equity Before Minority Interest', '_1999': this.balanceSheet[0].equityBeforeMinInt, '_2000': this.balanceSheet[1].equityBeforeMinInt, '_2001': this.balanceSheet[2].equityBeforeMinInt, '_2002': this.balanceSheet[3].equityBeforeMinInt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Minority/Non Controlling Interest', '_1999': this.balanceSheet[0].minNonControlInt, '_2000': this.balanceSheet[1].minNonControlInt, '_2001': this.balanceSheet[2].minNonControlInt, '_2002': this.balanceSheet[3].minNonControlInt},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Equity', '_1999': this.balanceSheet[0].totalEquity, '_2000': this.balanceSheet[1].totalEquity, '_2001': this.balanceSheet[2].totalEquity, '_2002': this.balanceSheet[3].totalEquity},
            // tslint:disable-next-line: max-line-length
            {metric: 'Total Liabilities & Equity', '_1999': this.balanceSheet[0].liabAndEquity, '_2000': this.balanceSheet[1].liabAndEquity, '_2001': this.balanceSheet[2].liabAndEquity, '_2002': this.balanceSheet[3].liabAndEquity},
            // tslint:disable-next-line: max-line-length
            {metric: 'Accrued Liabilities', '_1999': this.balanceSheet[0].accuredLiab, '_2000': this.balanceSheet[1].accuredLiab, '_2001': this.balanceSheet[2].accuredLiab, '_2002': this.balanceSheet[3].accuredLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Pension Liabilities', '_1999': this.balanceSheet[0].pensionLiab, '_2000': this.balanceSheet[1].pensionLiab, '_2001': this.balanceSheet[2].pensionLiab, '_2002': this.balanceSheet[3].pensionLiab},
            // tslint:disable-next-line: max-line-length
            {metric: 'Pensions', '_1999': this.balanceSheet[0].pensions, '_2000': this.balanceSheet[1].pensions, '_2001': this.balanceSheet[2].pensions, '_2002': this.balanceSheet[3].pensions}
        ];
        this.dataSource = new MatTableDataSource(this.BALANCE_SHEET);
    }

}
