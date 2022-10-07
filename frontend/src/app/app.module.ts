import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authorization/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './authorization/auth.component';
import { RegisterComponent } from './authorization/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PopoverModule } from 'ngx-smart-popover';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './authorization/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { MatPaginatorModule, MatTableModule } from '@angular/material';


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
