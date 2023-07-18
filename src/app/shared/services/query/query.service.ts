import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private toastService: NbToastrService
  ) { }

  public query(method: string, url: string, payload?: {}, contentType: string = 'application/json'): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.getToken(),
      Accept: 'application/json'
    });

    if (contentType !== undefined) {
      headers.append('Content-Type', contentType);
    }

    return this.httpClient.request(
      method,
      environment.apiUrl + url,
      {
        body: payload,
        headers: headers
      }
    ).pipe(
      tap(
        data => {},
        error => {
          if (error.status) {
            if (error?.status === 0 || error?.status[0] === 5) {
              let message: string;

              error.error?.message ? message = error.error.message : message = 'Une erreur s\'est produite';

              this.toastService.show(message);
            } else if (error?.status === 401) {
              this.authService.logout();
              this.toastService.show('Vous avez été déconnecté(e)');
            }
          }
        }
      )
    );
  }
}