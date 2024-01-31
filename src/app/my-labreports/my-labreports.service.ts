import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';
import {catchError, retry} from "rxjs/operators";
import {Observable} from "../../../node_modules/rxjs";

@Injectable({
  providedIn: 'root', // You can also provide the service at the root level.
})
export class MyLabreportsService {
  private documentlist = this.globals.globallink + 'mst_document_category/dropdown/?';
  // private myLabReportsList = this.globals.globallink + 'myLabReports/myLabReportsList/';
  private myLabReportsListByPatient = this.globals.globallink + 'myLabReports/myLabReportsListByPatient/';
  private myLabReportsListById = this.globals.globallink + 'myLabReports/getLabReportsListById/';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private myLabListByPatient = this.globals.globallink + 'my-radiology/myRadiologyListByPatient/';
  private sendToOtherss = this.globals.globallink + 'my-radiology/sendToOthers/';
  private GetByPatientIdRecordService = this.globals.globallink + 'tpath_bs/get_by_patientid/?';
  private getFileList = this.globals.globallink + 'myLabReports/myLabReportsList/';
  private sendToLab_new = this.globals.globallink + 'myLabReports/sentPathologyToLab/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  getByPatientIdRecordService(currentPage: any, size: any, qString: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.GetByPatientIdRecordService + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getMyLabReportsList(patientId: any): Promise<any> {
    return this.http.get(this.myLabReportsListByPatient + "?patientId=" +patientId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  GetFileList(): Promise<any> {
    return this.http.get(this.getFileList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getMyLabReportsById(myLabReportsId: any): Promise<any> {
    return this.http.get(this.myLabReportsListById + myLabReportsId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getDocumentList(): Promise<any> {
    return this.http.get(this.documentlist)
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

  getLabByPatient(patientId): Promise<any> {
    return this.http.get(this.myLabListByPatient  + "?patientId=" +patientId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  sentToLab(myLabReportsId): Promise<any> {
    return this.http.get(this.sendToLab_new  + "?myLabReportsId=" +myLabReportsId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
