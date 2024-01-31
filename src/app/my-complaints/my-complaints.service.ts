import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';


@Injectable()
export class MyComplaintsService {

  private documentlist = this.globals.globallink + 'mst_document_category/dropdown/?';
  private getComplaitsList = this.globals.globallink + 'myComplaints/myComplaints-list/';
  private getComplaitsListByPatient = this.globals.globallink + 'myComplaints/myComplaintsListByPatient/';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private getComplaintslistByid = this.globals.globallink + 'myComplaints/myComplaintsListById/';
  private addMyComplaints = this.globals.globallink + 'myComplaints/createMyComplaints/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  getComplaitsLists(): Promise<any> {
    return this.http.get(this.getComplaitsList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getComplaitsListsByPatientId(patientId: any): Promise<any> {
    return this.http.get(this.getComplaitsListByPatient + "?patientId=" +patientId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getComplaitsListById(myComplaintsId: any): Promise<any> {
    return this.http.get(this.getComplaintslistByid + myComplaintsId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addComplaints(model: any): Promise<any> {
    return this.http.post(this.addMyComplaints, model, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  patientIdByUserId(user_id: any): Promise<any> {
    return this.http.put(this.getPatientId + user_id, this.httpOptions)
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

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
