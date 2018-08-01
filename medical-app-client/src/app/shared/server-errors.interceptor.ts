import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { MatSnackBar } from '@angular/material';
import { Observable, EMPTY } from "../../../node_modules/rxjs";
import { NUMBER_OF_RETRIES } from './variables.constant';
import { tap, catchError, retry } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ServerErrors implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) {
    }

    // https://github.com/angular/material2/issues/7470
    // https://www.academind.com/learn/javascript/rxjs-6-what-changed/
    // https://stackoverflow.com/questions/50475213/rxjs-6-new-version-of-httpinterceptor
    // https://stackoverflow.com/questions/48030197/what-is-pipe-function-in-angular-2
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(NUMBER_OF_RETRIES))
                   .pipe(tap(event => {
                       if (event instanceof HttpResponse) {
                        if (event.body && event.body.error === true && event.body.errorMessage) {
                           throw new Error(event.body.errorMessage);
                        }
                        // else {
                        //     this.snackBar.open('SUCCESS', 'INFO', { duration: 5000 });
                        // }
                       }
                   }))
                   .pipe(catchError((exception) => {
                       console.log(exception);
                       // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
                       if (exception.status === 400) {
                           this.snackBar.open(exception.error.message, 'ERROR 400', { duration: 5000 });
                       } else if (exception.status === 401) {
                           // this.router.navigate(['/login']);
                       } else if (exception.status === 500) {
                           this.snackBar.open(exception.error.message, 'ERROR 500', { duration: 5000 });
                       } else {
                           this.snackBar.open(exception.error.menssage, 'ERROR', { duration: 5000 });
                       }
                       return EMPTY;
                   }));
    }
}
