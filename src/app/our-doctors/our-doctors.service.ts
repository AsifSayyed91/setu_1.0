import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Global} from '../globalpath';


@Injectable()
export class OurDoctorsService {

  private followCreate = this.globals.globallink + 'trn_followup/create/';
  private ListRecordBySpecialityId = this.globals.globallink + 'mst_staff/listbysdidunitid/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  followCreateService(userId, staffId, model): Promise<any> {
    // console.log(JSON.stringify(model));
    return this.http.post(this.followCreate + userId + '/' + staffId, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getDocBySpecialityIdUnitId(id: any, userId: any, unitid: any): Observable<any> {
    return this.http.get(this.ListRecordBySpecialityId + id + '/' + userId + '/' + unitid, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}


