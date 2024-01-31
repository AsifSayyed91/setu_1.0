import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Global} from '../globalpath';


@Injectable({
  providedIn: 'root', // You can also provide the service at the root level.
})
export class MyPrescriptionService {
  private paymenyByPatientId = this.globals.globallink + 'tbill_bill/getPaymentDetailsByPatientUserId/?';
  private prescriptionbypatientId = this.globals.globallink + 'temr_visit_prescription/viewPrescriptionListByPatientId/?';
  private documentlist = this.globals.globallink + 'mst_document_category/dropdown/?';
  private closedAppointmenListByUserIdurl = this.globals.globallink + 'trn_appointment/ClosedAppoinmentByUserId/?';
  private getPrescriptionReceiptByvpId = this.globals.globallink + 'temr_item_prescription/getItemPrescriptionByVpId/';
  private prescriptionById = this.globals.globallink + 'temr_visit_prescription/byid/';
  private getPaymentReceiptbybillId = this.globals.globallink + 'tbill_service/listbybill/';
  private GetByPatientIdRecordService = this.globals.globallink + 'tpath_bs/get_by_patientid/?';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private ListRecordByPatientId = this.globals.globallink + 'temr_document_upload/listByPatientId/?';
  private GetReportByPsId = this.globals.globallink + 'mpath_result/get_report_by_psid/';
  private pharmacyOrder = this.globals.globallink + 'temr_item_prescription/orderToPharmacy/';
  private sendPharmacy = this.globals.globallink + 'pharmacy/setPrescriptionToPharmacy/';
  private generateSession = 'https://staging.800pharmacy.ae/api/1.0/?c=session';
  // private generateOrder = 'https://staging.800pharmacy.ae/api/1.0?c=orders&m=create';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpOptions_pharmacy = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Partner-Id': 'bad5d06e-5bda-11eb-be80-a4bf0127a71a',
      'X-Security-Code': 'ce44ccad-3581-11ed-9b81-a4bf0127a71a'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  generate800PharmacyToken(){
    return this.http.post(this.generateSession, '', this.httpOptions_pharmacy)
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

  getByVisitIdRecordService(currentPage: any, size: any, qString: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.ListRecordByPatientId + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPrescriptionlist(patient_id: any, currentPage: any, size: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.prescriptionbypatientId + 'patientId=' + patient_id + '&page=' + currentPage + '&size=' + size + '&sort=' + sort + '&col=' + col, this.httpOptions)
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

  getPrescriptionReceiptbyvpId(vpId): Observable<any> {
    return this.http.get<any>(this.getPrescriptionReceiptByvpId + vpId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getPrescriptionById(vpId): Observable<any> {
    return this.http.get<any>(this.prescriptionById+ vpId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  sendToPharmacy(patientId, vpId): Promise<any> {
    return this.http.get(this.sendPharmacy + '?patientId=' + patientId + '&vpId=' + vpId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);

  }


  orderToPharmacy(vpId, userId): Observable<any> {
    return this.http.get<any>(this.pharmacyOrder + vpId + '/1' + '/' + userId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getPaymentReceiptByBillId(billId): Observable<any> {
    return this.http.get<any>(this.getPaymentReceiptbybillId + billId, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getByPatientIdRecordService(currentPage: any, size: any, qString: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.GetByPatientIdRecordService + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getPaymentDetailsByPatientId(patient_id: any, currentPage: any, size: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.paymenyByPatientId + 'patientId=' + patient_id + '&page=' + currentPage + '&size=' + size + '&sort=' + sort + '&col=' + col, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  closedAppointmenListByUserId(user_id: any, currentPage: any, size: any, sort: any, col: any): Observable<any> {
    return this.http.get<any>(this.closedAppointmenListByUserIdurl + 'userId=' + user_id + '&page=' + currentPage + '&size=' + size + '&sort=' + sort + '&col=' + col, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getReportByPsId(psId: any): Promise<any> {
    return this.http.get(this.GetReportByPsId + psId)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

  // getPrescription(mrno): Observable<any> {
  //   return this.http.get<any>(this.prescriptionbBymrno1+ mrno, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  // getPrescriptionlist(modal): Observable<any> {
  //   return this.http.post<any>(this.prescriptionbBymrno, JSON.stringify(modal), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  // getLabReports(userId): Observable<any> {
  //   return this.http.get<any>(this.labreports + userId, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  // getAppointmentList(): Observable<any[]> {
  //   console.log('appointmentReasonList :' + this.appointmentReasonList);
  //   return this.http.get<any[]>(this.appointmentReasonList)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  // getLabReportsByviId(billId): Observable<any> {
  //   return this.http.get<any>(this.getLabreportsByviId + billId, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }
}
