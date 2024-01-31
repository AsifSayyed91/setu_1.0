import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';

@Injectable()
export class ChronicPatinetManagementService {

  private documentlist = this.globals.globallink + 'mst_document_category/dropdown/?';
  private getChronicDeasisList = this.globals.globallink + 'mst_chronic_disease/chronicDeasisList/';
  private getChronicDeasiseListByPatient = this.globals.globallink + 'chronic_patient/chronicDeasaseListByPatientId/';
  private getChronicPaytientListbyId = this.globals.globallink + 'chronic_patient/chronicPatient-listById/';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private addRecoord = this.globals.globallink + 'chronic_patient/create';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  getChronicDeasiseList(): Promise<any> {
    return this.http.get(this.getChronicDeasisList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getChronicDeasisListByPatient(patientId):Promise<any>{
    return this.http.get(this.getChronicDeasiseListByPatient, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  //for get chronic patient list by id
  getChronicPatientListById(chronicPatientId: any): Promise<any> {
    return this.http.get(this.getChronicPaytientListbyId + chronicPatientId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  //for add chronic patient
  addChronicPatiet(model: any): Promise<any> {
    return this.http.post(this.addRecoord, model, this.httpOptions)
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
