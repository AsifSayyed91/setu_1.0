import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';
import {Observable} from "../../../node_modules/rxjs";
import {catchError, retry} from "rxjs/operators";


@Injectable()
export class MySickLeavesService {

  private myRefferalsByPatientId = this.globals.globallink + 'myrefferals/viewMyRefferalsListByPatientId/?';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private mySickLeavesList = this.globals.globallink + 'my-sickleaves/mysickleaves-list/?';
  private mySickLeavesListByPatientId = this.globals.globallink + 'my-sickleaves/mySickLeavesListByPatient/';
  private mySickLeavesListById = this.globals.globallink + 'my-sickleaves/getSickleavesListById/';
  private sendToOtherss = this.globals.globallink + 'my-sickleaves/sendToOthers/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  getRefferalsListByPatientId(patient_id: any, currentPage: any, size: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.myRefferalsByPatientId + 'patientId=' + patient_id + '&page=' + currentPage + '&size=' + size +
      '&sort=' + sort + '&col=' + col, this.httpOptions).toPromise().then(response => response)
      .catch(this.handleError);
  }

  getSickleavesList(): Promise<any> {
    return this.http.get(this.mySickLeavesList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getSickleavesListByPatient(patientId: any): Promise<any> {
    return this.http.get(this.mySickLeavesListByPatientId + "?patientId=" +patientId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getSickLeavesListById(mySickLeavesId: any): Promise<any> {
    return this.http.get(this.mySickLeavesListById + mySickLeavesId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  sendToOthers(vpId, userId): Observable<any> {
    return this.http.get<any>(this.sendToOtherss + vpId + '/1' + '/' + userId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  patientIdByUserId(user_id: any): Promise<any> {
    return this.http.put(this.getPatientId + user_id, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
