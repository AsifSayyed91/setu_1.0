import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';


@Injectable()
export class HomeHealthService {

  private documentlist = this.globals.globallink + 'mst_document_category/dropdown/?';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private getQueryListByid = this.globals.globallink + 'homeHealthServices/homeHealthServicesListById/';
/*  private addQuery = this.globals.globallink + 'homeHealthServices/addEnquiry/';*/
  private addEnquiry = this.globals.globallink + 'homeHealthServices/homeHealthServicesCreate/';
  private getQueryList = this.globals.globallink + 'homeHealthServices/homeHealthServices-list';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }


  getQueryLists(): Promise<any> {
    return this.http.get(this.getQueryList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getQueryListById(homeHealthServiceId: any): Promise<any> {
    return this.http.get(this.getQueryListByid + homeHealthServiceId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addQueries(model: any): Promise<any> {
    return this.http.post(this.addEnquiry, model, this.httpOptions)
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
