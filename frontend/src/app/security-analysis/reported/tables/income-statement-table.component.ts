import { Component, ViewChild, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { IncomeSheet } from '../../../server-communication/app-endpoint.constants';
import { ReportedService } from '../reported.service';

@Component({
    selector: 'app-income-statement-table',
    template: `
        <div class="mat-elevation-z8">
            <smt-income-one *ngIf="displayTable1" [incomeSheet]="incomeSheets[0]"></smt-income-one>
            <smt-income-two *ngIf="displayTable2" [incomeSheet]="incomeSheets[1]"></smt-income-two>
            <smt-income-three *ngIf="displayTable3" [incomeSheet]="incomeSheets[2]"></smt-income-three>
            <smt-income-four *ngIf="displayTable4" [incomeSheet]="incomeSheets[3]"></smt-income-four>
            <smt-income-five *ngIf="displayTable5" [incomeSheet]="incomeSheets[4]"></smt-income-five>
        </div>
        <div class="center-buttons">
            <button (click)="displayTable(1)" class="btn btn-primary">1999-2002</button>
            <button (click)="displayTable(2)" class="btn btn-primary">2003-2006</button>
            <button (click)="displayTable(3)" class="btn btn-primary">2007-2010</button>
            <button (click)="displayTable(4)" class="btn btn-primary">2011-2014</button>
            <button (click)="displayTable(5)" class="btn btn-primary">2015-2018</button>
        </div>
    `,
    styleUrls: ['table.scss']
})
export class IncomeStatementTableComponent implements OnInit {
    // State booleans.
    public displayTable1 = true;
    public displayTable2 = false;
    public displayTable3 = false;
    public displayTable4 = false;
    public displayTable5 = false;

    public incomeSheets: IncomeSheet[][];

    constructor(public reportedService: ReportedService) {
        this.incomeSheets = this.reportedService.getIncomeTables();
    }

    ngOnInit() { }

    public displayTable(table: number) {
        if (table === 1) {
            this.displayTable1 = true;
            this.displayTable2 = false;
            this.displayTable3 = false;
            this.displayTable4 = false;
            this.displayTable5 = false;

        } if (table === 2) {
            this.displayTable1 = false;
            this.displayTable2 = true;
            this.displayTable3 = false;
            this.displayTable4 = false;
            this.displayTable5 = false;

        } if (table === 3) {
            this.displayTable1 = false;
            this.displayTable2 = false;
            this.displayTable3 = true;
            this.displayTable4 = false;
            this.displayTable5 = false;

        } if (table === 4) {
            this.displayTable1 = false;
            this.displayTable2 = false;
            this.displayTable3 = false;
            this.displayTable4 = true;
            this.displayTable5 = false;

        } if (table === 5) {
            this.displayTable1 = false;
            this.displayTable2 = false;
            this.displayTable3 = false;
            this.displayTable4 = false;
            this.displayTable5 = true;
        }
    }
}
