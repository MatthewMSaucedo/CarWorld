import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) { }

    // Inject authorization token into appropriate requests.
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        if (authToken) {
            const authRequest = request.clone({
                headers: request.headers.set('Authorization', authToken)
            });
            return next.handle(authRequest);
        } else {
            return next.handle(request);
        }
    }
}
