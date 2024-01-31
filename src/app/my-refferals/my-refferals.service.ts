import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';


@Injectable()
export class MyRefferalsService {

  private myRefferalsByPatientId = this.globals.globallink + 'myrefferals/viewMyRefferalsListByPatientId/?';
  private myRefferalsList = this.globals.globallink + 'my-refferals/list/?';
  private myRefferalsListByPatientId = this.globals.globallink + 'my-refferals/myRefferalsListByPatient/';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private GetRefferalsListById = this.globals.globallink + 'my-refferals/getRefferalsListById/';
  private getRefferalByPartner = this.globals.globallink + 'my-refferals/getRefferalsListByPartnerId/';
/*private getPartnerByServiceId = this.globals.globallink + 'mst_partner/listByServiceId/';*/
  private getPartnerIsPrefferedTrue = this.globals.globallink + 'mst_partner/partnerListByPreffered/';
  private getAllPartnerList = this.globals.globallink + 'mst_partner/list/';
  private getAllLabReportsList = this.globals.globallink + 'myLabReports/myLabReportsList/';
  private getAllRadiologyList = this.globals.globallink + 'my-radiology/radiology-list/';
  private getRefferalsListByLabReports = this.globals.globallink + 'my-refferals/refferalsListByLab/';
  private getRefferalsListByRadiology = this.globals.globallink + 'my-refferals/refferalsListByRadiology/';
  private sendToLab = this.globals.globallink + 'myLabReports/setRefferalToLabReports';
  private create = this.globals.globallink + 'myLabReports/create';
  private sendToRadiology = this.globals.globallink + 'my-radiology/sendToRadiology';
  private getPartnerListByRadiology = this.globals.globallink + 'mst_partner/partnerListByRadiology/';
  private getPartnersListByLab = this.globals.globallink + 'mst_partner/partnerListByLabReports/';
  private sendToAdminPortal = this.globals.globallink + 'my-refferals/senttoAdminPortal/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient, private globals: Global) {
  }


  partnerList(): Promise<any> {
    return this.http.get(this.getAllPartnerList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRefferalsListByPatientId(patient_id: any, currentPage: any, size: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.myRefferalsByPatientId + 'patientId=' + patient_id + '&page=' + currentPage + '&size=' + size +
      '&sort=' + sort + '&col=' + col, this.httpOptions).toPromise().then(response => response)
      .catch(this.handleError);
  }

  getPartnerListIsPrefferedTrue(): Promise<any> {
    return this.http.get(this.getPartnerIsPrefferedTrue, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }




  getLabReports(): Promise<any> {
    return this.http.get(this.getAllLabReportsList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRadiology(): Promise<any> {
    return this.http.get(this.getAllRadiologyList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRefferalsList(): Promise<any> {
    return this.http.get(this.myRefferalsList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRefferalsListPatient(patientId : any): Promise<any> {
    return this.http.get(this.myRefferalsListByPatientId + "?patientId=" +patientId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRefferalsListByLab(): Promise<any> {
    return this.http.get(this.getRefferalsListByLabReports, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRefferalsListRadio(): Promise<any> {
    return this.http.get(this.getRefferalsListByRadiology, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnersByRadiology(): Promise<any> {
    return this.http.get(this.getPartnerListByRadiology, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnersByLab(): Promise<any> {
    return this.http.get(this.getPartnersListByLab, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getRefferalsListById(myRefferalsId: any): Promise<any> {
    return this.http.get(this.GetRefferalsListById + myRefferalsId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getRefferalsListByPartner(partnerId: any): Promise<any> {
    return this.http.get(this.getRefferalByPartner + partnerId, this.httpOptions)
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

  sendLab(patientId, myRefferalsId,partnerId): Promise<any> {
    return this.http.get(this.sendToLab + '?patientId=' + patientId + '&myRefferalsId=' + 0 + '&partnerId=' + partnerId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  createLabReport(model: any): Promise<any> {
    return this.http.post(this.create, model, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  sendRadiology(patientId, myRefferalsId,partnerId): Promise<any> {
    return this.http.get(this.sendToRadiology + '?patientId=' + patientId + '&myRefferalsId=' + myRefferalsId+ '&partnerId=' + partnerId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  setToAdminPortal(myRefferalsId : any): Promise<any> {
    return this.http.get(this.sendToAdminPortal + "?myRefferalsId=" +myRefferalsId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }



 /* getPartnerListByServiceId(partnerServiceId: any): Promise<any> {
    return this.http.get(this.getPartnerByServiceId + partnerServiceId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
*/


  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
