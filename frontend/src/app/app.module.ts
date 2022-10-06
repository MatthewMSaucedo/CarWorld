import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authorization/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MarketAnalysisComponent } from './market-analysis/market-analysis.component';
import { SecurityAnalysisComponent } from './security-analysis/security-analysis.component';
import { AuthComponent } from './authorization/auth.component';
import { RegisterComponent } from './authorization/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PopoverModule } from 'ngx-smart-popover';
import { DashboardComponent } from './security-analysis/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './authorization/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { ReportedComponent } from './security-analysis/reported/reported.component';
import { CashflowTableComponent } from './security-analysis/reported/tables/cashflow-statement-table.component';
import { BalanceSheetTableComponent } from './security-analysis/reported/tables/balance-sheet-table.component';
import { IncomeStatementTableComponent } from './security-analysis/reported/tables/income-statement-table.component';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { SmtIncomeOneComponent } from './security-analysis/reported/tables/income/smt-income-one.component';
import { SmtIncomeTwoComponent } from './security-analysis/reported/tables/income/smt-income-two.component';
import { SmtIncomeThreeComponent } from './security-analysis/reported/tables/income/smt-income-three.component';
import { SmtIncomeFourComponent } from './security-analysis/reported/tables/income/smt-income-four.component';
import { SmtIncomeFiveComponent } from './security-analysis/reported/tables/income/smt-income-five.component';
import { SmtBalanceOneComponent } from './security-analysis/reported/tables/balance/smt-balance-one.component';
import { SmtBalanceTwoComponent } from './security-analysis/reported/tables/balance/smt-balance-two.component';
import { SmtBalanceThreeComponent } from './security-analysis/reported/tables/balance/smt-balance-three.component';
import { SmtBalanceFourComponent } from './security-analysis/reported/tables/balance/smt-balance-four.component';
import { SmtBalanceFiveComponent } from './security-analysis/reported/tables/balance/smt-balance-five.component';
import { SmtCashflowOneComponent } from './security-analysis/reported/tables/cashflow/smt-cashflow-one.component';
import { SmtCashflowTwoComponent } from './security-analysis/reported/tables/cashflow/smt-cashflow-two.component';
import { SmtCashflowThreeComponent } from './security-analysis/reported/tables/cashflow/smt-cashflow-three.component';
import { SmtCashflowFourComponent } from './security-analysis/reported/tables/cashflow/smt-cashflow-four.component';
import { SmtCashflowFiveComponent } from './security-analysis/reported/tables/cashflow/smt-cashflow-five.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AboutComponent,
        HomeComponent,
        ProfileComponent,
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        MarketAnalysisComponent,
        SecurityAnalysisComponent,
        ReportedComponent,
        CashflowTableComponent,
        BalanceSheetTableComponent,
        IncomeStatementTableComponent,
        DashboardComponent,
        SmtIncomeOneComponent,
        SmtIncomeTwoComponent,
        SmtIncomeThreeComponent,
        SmtIncomeFourComponent,
        SmtIncomeFiveComponent,
        SmtBalanceOneComponent,
        SmtBalanceTwoComponent,
        SmtBalanceThreeComponent,
        SmtBalanceFourComponent,
        SmtBalanceFiveComponent,
        SmtCashflowOneComponent,
        SmtCashflowTwoComponent,
        SmtCashflowThreeComponent,
        SmtCashflowFourComponent,
        SmtCashflowFiveComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        PopoverModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        MatPaginatorModule,
        MatTableModule
    ],
    providers: [
        HttpClient,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
