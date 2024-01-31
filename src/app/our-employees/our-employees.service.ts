import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';


@Injectable()
export class OurEmployeesService {
 /* private headers = new Headers({'Content-Type': 'application/json'});
  private partnersList = this.globals.globallink + 'mst_partner/list/?';*/
  private empList = this.globals.globallink + 'mstEmployee/employeeList/?';
  // private deleteRecord = this.globals.globallink + 'mstEmployee/delete/';

  /*private partnersListByRadiology = this.globals.globallink + 'mst_partner/partnerListRadiology/?';
  private partnersListByLab = this.globals.globallink + 'mst_partner/partnerListLabReports/?';
  private partnersListByHH = this.globals.globallink + 'mst_partner/partnerListByHH/?';
  private partnerListByCDM = this.globals.globallink + 'mst_partner/partnerListByCDM/?';
  private partnerListByMT = this.globals.globallink + 'mst_partner/partnerListByMT/?';
  private partnerListByMedicineDelivery = this.globals.globallink + 'mst_partner/partnerListByMedicineDelivery/?';
  private partnerListByPartnerManagement = this.globals.globallink + 'mst_partner/partnerListByPartnerManagement/?';
  private partnerListByPharmacy = this.globals.globallink + 'mst_partner/partnerListByPharmacy/?';
  private partnerListByPhysiothraphy = this.globals.globallink + 'mst_partner/partnerListByPhysiotherapy/?';
  private partnerListById = this.globals.globallink + 'chronic_patient/getChronicPatientListById/';*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private globals: Global) {
  }


  getEmployeeList(): Promise<any> {
    return this.http.get(this.empList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

 /* deleteRecordService(id: any) {
    return this.http.put(this.deleteRecord + id, {headers: this.httpOptions})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }*/


  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
