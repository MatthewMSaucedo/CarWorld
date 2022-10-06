import { Component, ViewChild, OnInit, Input, AfterViewInit } from '@angular/core';
import { CashflowSheet } from '../../../server-communication/app-endpoint.constants';
import { ReportedService } from '../reported.service';

@Component({
    selector: 'app-cashflow-statement-table',
    template: `
        <div class="mat-elevation-z8">
            <smt-cashflow-one *ngIf="displayTable1" [cashflowSheet]="cashflowSheets[0]"></smt-cashflow-one>
            <smt-cashflow-two *ngIf="displayTable2" [cashflowSheet]="cashflowSheets[1]"></smt-cashflow-two>
            <smt-cashflow-three *ngIf="displayTable3" [cashflowSheet]="cashflowSheets[2]"></smt-cashflow-three>
            <smt-cashflow-four *ngIf="displayTable4" [cashflowSheet]="cashflowSheets[3]"></smt-cashflow-four>
            <smt-cashflow-five *ngIf="displayTable5" [cashflowSheet]="cashflowSheets[4]"></smt-cashflow-five>
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
export class CashflowTableComponent implements OnInit {
    // State booleans.
    public displayTable1 = true;
    public displayTable2 = false;
    public displayTable3 = false;
    public displayTable4 = false;
    public displayTable5 = false;

    public cashflowSheets: CashflowSheet[][];

    constructor(public reportedService: ReportedService) {
        this.cashflowSheets = this.reportedService.getCashlowTables();
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
