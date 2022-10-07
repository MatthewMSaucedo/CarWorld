import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppEndpointService } from '../server-communication/app-endpoint.service';

@Component({
    selector: 'cw-landing',
    template: `
        <div class="bg">
            <div style="margin-top: -2rem;">
                <div class="home-content">
                    <!-- NOTE: Not sure if we want this
                        <h1>
                            Some title text
                        </h1>
                    -->
                    <h1 class="big_font_120">SUCCESS</h1>
                    <button
                        type="button"
                        class="btn btn-primary"
                        (click)="onStartNow()">
                        ENTER CAR WORLD
                    </button>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
    constructor(
        private _elementRef: ElementRef,
        private _router: Router
    ) { }

    ngOnInit(): void { }

    // Route to home component.
    public onStartNow(): void {
        this._router.navigate(['/home']);
    }
}
