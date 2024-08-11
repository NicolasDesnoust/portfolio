import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectContentResolver implements Resolve<string> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.http
      .get(`content/projects/${route.params['projectId']}.md`, {
        responseType: 'text',
      })
      .pipe(
        catchError((error: Response) => {
          if (error.status === 404) {
            return of('');
          }
          return throwError(error);
        })
      );
  }
}
