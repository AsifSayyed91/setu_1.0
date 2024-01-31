import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';


@Injectable()
export class ProfileService {
  private EditRecord = this.globals.globallink + 'mst_patient/updatePatient';
  private updatePatient = this.globals.globallink + 'mst_user/update';
  private Profile = this.globals.globallink + 'mst_user/byid/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  editRecordService(model: any) {
    return this.http.put(this.EditRecord, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  updatePatient_(model: any) {
    return this.http.put(this.updatePatient, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getProfile(userId): Promise<any> {
    return this.http.get(this.Profile + userId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}
