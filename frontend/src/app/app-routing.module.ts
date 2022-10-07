import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './authorization/login.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './home/landing.component';
import { WikiComponent } from './wiki/wiki.component';
import { MerchStoreComponent } from './merch-store/merch-store.component';
import { EarnDevotionPointsComponent } from './earn-devotion-points/earn-devotion-points.component';
import { AuthComponent } from './authorization/auth.component';
import { RegisterComponent } from './authorization/register.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes =
[
    {
        path: '',
        redirectTo: '/landing',
        pathMatch: 'full'
    },
    {
        path: 'landing',
        component: LandingComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'wiki',
        component: WikiComponent,
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
        path: 'earn-devotion-points',
        component: EarnDevotionPointsComponent,
    },
    {
        path: 'merch-store',
        component: MerchStoreComponent,
    }
];

@NgModule
({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
