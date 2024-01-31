import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';


@Injectable()
export class PartnerService {
  private partnersList = this.globals.globallink + 'mst_partner/list/?';
  private partnersListByRadiology = this.globals.globallink + 'mst_partner/partnerListRadiology/?';
  private partnersListByLab = this.globals.globallink + 'mst_partner/partnerListLabReports/?';
  private partnersListByHH = this.globals.globallink + 'mst_partner/partnerListByHH/?';
  private partnerListByCDM = this.globals.globallink + 'mst_partner/partnerListByCDM/?';
  private partnerListByMT = this.globals.globallink + 'mst_partner/partnerListByMT/?';
  private partnerListByMedicineDelivery = this.globals.globallink + 'mst_partner/partnerListByMedicineDelivery/?';
  private partnerListByPartnerManagement = this.globals.globallink + 'mst_partner/partnerListByPartnerManagement/?';
  private partnerListByPharmacy = this.globals.globallink + 'mst_partner/partnerListByPharmacy/?';
  private partnerListByPhysiothraphy = this.globals.globallink + 'mst_partner/partnerListByPhysiotherapy/?';
  private partnerListByAesthetics = this.globals.globallink + 'mst_partner/partnerListByAesthetics/?';

  private partnerListById = this.globals.globallink + 'chronic_patient/getChronicPatientListById/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private globals: Global) {
  }

  getPartnerListById(chronicPatientId: any): Promise<any> {
    return this.http.get(this.partnerListById + chronicPatientId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerList(): Promise<any> {
    return this.http.get(this.partnersList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerListByRardiology(): Promise<any> {
    return this.http.get(this.partnersListByRadiology, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getPartnerListByLab(): Promise<any> {
    return this.http.get(this.partnersListByLab, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerListByHH(): Promise<any> {
    return this.http.get(this.partnersListByHH, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerListByCDM(): Promise<any> {
    return this.http.get(this.partnerListByCDM, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerListByMT(): Promise<any> {
    return this.http.get(this.partnerListByMT, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerListByMedicineDelivery(): Promise<any> {
    return this.http.get(this.partnerListByMedicineDelivery, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerListByParnternManagement(): Promise<any> {
    return this.http.get(this.partnerListByPartnerManagement, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerListByPharmacy(): Promise<any> {
    return this.http.get(this.partnerListByPharmacy, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerListByPhysiotheraphy(): Promise<any> {
    return this.http.get(this.partnerListByPhysiothraphy, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPartnerListByAesthetics(): Promise<any> {
    return this.http.get(this.partnerListByAesthetics, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
