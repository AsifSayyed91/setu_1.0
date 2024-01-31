import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';
import {catchError, retry} from "rxjs/operators";
import {Observable} from "../../../node_modules/rxjs";

@Injectable({
  providedIn: 'root', // You can also provide the service at the root level.
})
export class MyRadiologyService {

  private myRadiologyByPatientId = this.globals.globallink + 'my-radiology/viewMyRadiologyListByPatientId/?';
  private myRadiologyList = this.globals.globallink + 'my-radiology/radiology-list/?';
  private myRadiologyListByPatient = this.globals.globallink + 'my-radiology/myRadiologyListByPatient/';
  private myRadiologyListById = this.globals.globallink + 'my-radiology/radiology-listById/';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private sendToOtherss = this.globals.globallink + 'my-radiology/sendToOthers/';
  // private sendToLab = this.globals.globallink + 'my-radiology/setRadiologyToLabReports';
  private sendToLab_new = this.globals.globallink + 'my-radiology/sentRadiologyToLab';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  getRadiologyListByPatientId(patient_id: any, currentPage: any, size: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.myRadiologyByPatientId + 'patientId=' + patient_id + '&page=' + currentPage + '&size=' + size +
      '&sort=' + sort + '&col=' + col, this.httpOptions).toPromise().then(response => response)
      .catch(this.handleError);
  }

  getRadiologyList(): Promise<any> {
    return this.http.get(this.myRadiologyList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getRadiologyListByPatient(patientId): Promise<any> {
    // return this.http.get(this.myRadiologyListByPatient + "?patientId="+ patientId, this.httpOptions)
    return this.http.get(this.myRadiologyListByPatient + "?patientId=" +patientId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRadiologyListById(myRadiologyId: any): Promise<any> {
    return this.http.get(this.myRadiologyListById + myRadiologyId, this.httpOptions)
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



  sendLab(myRadiologyId): Promise<any> {
    return this.http.get(this.sendToLab_new + '?myRadiologyId=' + myRadiologyId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);

  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
