import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';


@Injectable()
export class PhysiotherapyService {

  private myPartnerList = this.globals.globallink + 'mst_partner/list/?';
  private getPartnersListByPhysiotherapy = this.globals.globallink + 'mst_partner/partnerListByPhysiotherapy/?';

  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private addEnquiry = this.globals.globallink + 'physiotherapy/addEnqiuryForPhysiotherapy/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private globals: Global) {
  }

  getPartnersByPhysiotherapy(): Promise<any> {
    return this.http.get(this.getPartnersListByPhysiotherapy, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }



  createEnqiury(model: any): Promise<any> {
    return this.http.post(this.addEnquiry, model, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerList():Promise<any>{
    return this.http.get(this.myPartnerList,this.httpOptions)
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

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
