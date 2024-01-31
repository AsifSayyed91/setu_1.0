import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Global} from '../globalpath';

@Injectable({
  providedIn: 'root', // You can also provide the service at the root level.
})
export class RatingService {
  private rating = this.globals.globallink + 'trn_doctor_rating/create/';
  private ratingDataGet = this.globals.globallink + 'trn_doctor_rating/getRating/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private globals: Global) {
  }

  ratingadd(ratingData): Observable<any> {
    return this.http.post<any>(this.rating, JSON.stringify(ratingData), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  ratingGet(userId: any): Promise<any> {
    return this.http.get(this.ratingDataGet + userId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}
