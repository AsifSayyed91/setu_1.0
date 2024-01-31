import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';


@Injectable()
export class VitalServices {
  private AddRecord = this.globals.globallink + 'temr_vital/create';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  addRecordService(model: any) {
    return this.http.post(this.AddRecord, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}
