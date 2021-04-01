import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        if(request.url!=environment.baseapi+'/profile' && request.method!='POST'){
            if (!request.headers.has('Content-Type')) {
                request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
            }
        }

        request = request.clone({
            url: environment.baseapi + request.url,
            headers: request.headers.set('Accept', 'application/json')
        });

        return next.handle(request);
    }
}