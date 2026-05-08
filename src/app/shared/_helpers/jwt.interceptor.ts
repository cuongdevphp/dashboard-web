import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountService } from '../services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith('http://10.10.10.13:3001');
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    "x-api-key": "7D459aF8551Db7603bF7997C0357C95169F43c76"
                    //Authorization: `Bearer ${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}
