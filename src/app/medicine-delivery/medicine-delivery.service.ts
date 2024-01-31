import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';

@Injectable()
export class MedicineDeliveryService {

  private documentlist = this.globals.globallink + 'mst_document_category/dropdown/?';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private getMedicinDeliveryList = this.globals.globallink + 'medicineDelivery/list';
  private getPartnersListByPharmacy = this.globals.globallink + 'mst_partner/partnerListByPharmacy';
  private getMedicinDeliverListById = this.globals.globallink + 'medicineDelivery/medicineDeliveryListById/';
  private addMedicineDelivery = this.globals.globallink + 'medicineDelivery/create';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }




  getPartnersByPharmacy(): Promise<any> {
    return this.http.get(this.getPartnersListByPharmacy, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getMedicineDeliveryList(): Promise<any> {
    return this.http.get(this.getMedicinDeliveryList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getMedicineDeliveryListById(medicineDeliveryId: any): Promise<any> {
    return this.http.get(this.getMedicinDeliverListById + medicineDeliveryId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  addMEdicineDelivery(model: any): Promise<any> {
    return this.http.post(this.addMedicineDelivery, model, this.httpOptions)
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

  /*  getCountryList(): Observable<any[]> {
      return this.http.get<any[]>(this.getCountriesList)
        .pipe(retry(1), catchError(this.handleError));
    }

    getHospitalList():Observable<any[]>{
      return this.http.get<any[]>(this.getHospitalsList)
        .pipe(retry(1), catchError(this.handleError));
    }


    getDepartmentList():Observable<any[]>{
      return this.http.get<any[]>(this.departmentsList)
        .pipe(retry(1), catchError(this.handleError));
    }


    getHospitalListByCountryId(countryId: number):Observable<any[]>{
      return this.http.get<any[]>(this.getHospitalsListByCountryId + countryId)
        .pipe(retry(1), catchError(this.handleError));
    }


    getDepartmentListByHospitalId(hospitalId: number):Observable<any[]>{
      return this.http.get<any[]>(this.getDepartmentsListByHospitalId + hospitalId)
        .pipe(retry(1), catchError(this.handleError));
    }*/


  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
