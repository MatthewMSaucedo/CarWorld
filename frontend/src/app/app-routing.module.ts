import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './authorization/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SecurityAnalysisComponent } from './security-analysis/security-analysis.component';
import { MarketAnalysisComponent } from './market-analysis/market-analysis.component';
import { AuthComponent } from './authorization/auth.component';
import { RegisterComponent } from './authorization/register.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes =
[
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
        ]
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'market-analysis',
        component: MarketAnalysisComponent,
    },
    {
        path: 'security-analysis',
        component: SecurityAnalysisComponent,
    }
];

@NgModule
({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
