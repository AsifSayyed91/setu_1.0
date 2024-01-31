import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Global} from '../globalpath';


// @Injectable()
@Injectable({
  providedIn: 'root', // You can also provide the service at the root level.
})
export class AppointmentlistService {

  private appointmentReasonList = this.globals.globallink + 'mst_appointment_reason/dropdown';
  private serviceList = this.globals.globallink + 'mbill_service/listOfService';
  private subdeptlist = this.globals.globallink + 'mst_sub_department/dropdown1';
  private appointment = this.globals.globallink + 'trn_appointment/createAppointment';
  private appointmenListByUserIdurl = this.globals.globallink + 'dashboard/getAppoinmentCountByPatient/';
  private appointmenUpcomingByUserIdurl = this.globals.globallink + 'dashboard/getAppoinmentUpcomingCountByPatient/';
  private appointmenClosedByUserIdurl = this.globals.globallink + 'dashboard/getAppoinmentClosedByPatient/';
  // private appointmenListByUserIdurl = this.globals.globallink + 'trn_appointment/AppoinmentByUserId/?';
  private List_appointmenListByUserIdurl = this.globals.globallink + 'trn_appointment/AppoinmentByUserIdList/?';
  private closedAppointmenListByUserIdurl = this.globals.globallink + 'trn_appointment/ClosedAppoinmentByUserId/?';
  private appointmentCancelurl = this.globals.globallink + 'trn_appointment/cancel?appointmentId=';
  private getByAppointmentId = this.globals.globallink + 'trn_appointment/byid/';
  private unitlist = this.globals.globallink + 'mst_unit/dropdown';
  private getDocsBySubDepId = this.globals.globallink + 'mst_staff/getalldoctorlistBySubDepartment/';
  private GetDropDown = this.globals.globallink + 'mst_document_category/dropdown?';
  private uploadFileUrl = this.globals.globallink + 'uploadFile/api/uploadpatientfile';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private AddRecord = this.globals.globallink + 'temr_document_upload/create';
  private AddRecordForRefferals = this.globals.globallink + 'my-refferals/create';
  private AddRecordForRadiology = this.globals.globallink + 'my-radiology/create';
  private AddRecordForLabReports = this.globals.globallink + 'myLabReports/create';
  private AddREcordForPrescription = this.globals.globallink + 'temr_visit_prescription/addDocumentforPrescription';
  private AddRecordForSickLeaves = this.globals.globallink + 'my-sickleaves/create';
  // private AddRecordForMT = this.globals.globallink + 'medicalTourims/addEnquiry';
  private AddRecordForMT = this.globals.globallink + 'medicalTourims/create';
  private AddRecordForMD = this.globals.globallink + 'medicineDelivery/create';
  private ListRecordByPatientId = this.globals.globallink + 'temr_document_upload/listByPatientId/?';
  private getStaffRecord = this.globals.globallink + 'mst_staff/byid/';
  private todaySlot = this.globals.globallink + 'trn_doctor_schedule_detail/time/';
  private vitallist = this.globals.globallink + 'temr_vital/last5vitalsPatientId/';
  private conffirm = this.globals.globallink + 'trn_appointment/confirmAppointment/';
  private billCreate = this.globals.globallink + 'tbill_bill/create';
  private billServiceCreate = this.globals.globallink + 'tbill_service/createBilleServiceFromAppointment/';
  private AddConsultation = this.globals.globallink + 'temr_consultation/create';
  private payoption = 'http://localhost:8083/BasisPay_JAVA/Pay';
  private ListRecordBySpecialityId = this.globals.globallink + 'mst_staff/listbysdidunitid/';
  private SearchHospital = this.globals.globallink + 'mst_unit/autocomplete/';
  private SearchInsurance = this.globals.globallink + 'mst_insurance/autocomplete/';
  private InsuranceList = this.globals.globallink + 'mst_insurance/list/';
  private InsuranceListByUnitId = this.globals.globallink + 'mst_unit/GetInsuranceByUnitId/';
  private UnitListByInsuranceId = this.globals.globallink + 'mst_unit/GetUnitByInsuranceId/';
  private GetdoctorListByUnitId = this.globals.globallink + 'mst_unit/GetDoctorByUnitId/';
  private GetJoinCallNotification = this.globals.globallink + 'patientqueue/getJoinCallNotification_pp/?';
  private applyPrevCard = this.globals.globallink + 'previlagecard/applydiscount/?';
  private applyPrevilegeCard = this.globals.globallink + 'previlagecard/applyPrivilegeDiscount/?';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  addConsultationService(model: any) {
    // console.log(JSON.stringify(model));
    return this.http.post(this.AddConsultation, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getDocBySpecialityIdUnitId(id: any, unitid: any): Observable<any> {
    return this.http.get(this.ListRecordBySpecialityId + id + '/' + unitid, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  applyprevilegescardDiscount(cardno: any, emirateId: any, appoinmentId: any) {
    return this.http.get(this.applyPrevCard + 'cardno=' + cardno + '&emiratId=' + emirateId + '&appoinmentId=' + appoinmentId, this.httpOptions)
      .toPromise()
      .then(response =>  response)
      .catch(this.handleError);
  }

  applyPrevilegesCardDiscount(cardno: any, emirateId: any, appoinmentId: any) {
    return this.http.get(this.applyPrevilegeCard + 'cardno=' + cardno + '&emiratId=' + emirateId + '&appoinmentId=' + appoinmentId, this.httpOptions)
      .toPromise()
      .then(response =>  response)
      .catch(this.handleError);
  }

  getInsuranceList(): Observable<any> {
    return this.http.get(this.InsuranceList, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getInsuranceListByUnitId(id: any): Observable<any> {
    return this.http.get(this.InsuranceListByUnitId + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getUnitListByInsuranceId(id: any): Observable<any> {
    return this.http.get(this.UnitListByInsuranceId + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getDoctorListByUnitId(id: any): Observable<any> {
    return this.http.get(this.GetdoctorListByUnitId + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getJoinCallNotification(visitList: any): Observable<any> {
    return this.http.get(this.GetJoinCallNotification + "visitList=" + visitList, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }


  // (currentPage: any, size: any, qString: any, sort: any, col: any): Observable<any> {
  //   return this.http.get(this.UnitListByInsuranceId + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col, this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  getsearchByHospital(key: any): Observable<any> {
    return this.http.get(this.SearchHospital + key, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getsearchByInsurance(key: any): Observable<any> {
    return this.http.get(this.SearchInsurance + key, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  paymentOption(model) {
    // console.log(JSON.stringify(model));
    return this.http.post(this.payoption, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  createBill(model: any): Observable<any> {
    return this.http.post(this.billCreate, JSON.stringify(model), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  createBillService(model: any, id, visit_id): Observable<any> {
    return this.http.post(this.billServiceCreate + id + '/' + visit_id, JSON.stringify(model), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  createAppointment(appointment): Observable<any> {
    return this.http.post<any>(this.appointment, JSON.stringify(appointment), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAppointmentList(): Observable<any[]> {
    console.log('appointmentReasonList :' + this.appointmentReasonList);
    return this.http.get<any[]>(this.appointmentReasonList)
      .pipe(retry(1), catchError(this.handleError));
  }

  getServiceList(): Observable<any[]> {
    return this.http.get<any[]>(this.serviceList)
      .pipe(retry(1), catchError(this.handleError));
  }

  getSubDeptList(): Observable<any[]> {
    return this.http.get<any[]>(this.subdeptlist)
      .pipe(retry(1), catchError(this.handleError));
  }

  appointmentCancel(id: any, reasone: any): Observable<any> {
    return this.http.get<any>(this.appointmentCancelurl + id + '&appointmentreasone=' + reasone)
      .pipe(retry(1), catchError(this.handleError));
  }

  appointmentById(id: any): Observable<any> {
    return this.http.get<any>(this.getByAppointmentId + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  getUnitList(): Observable<any[]> {
    return this.http.get<any[]>(this.unitlist)
      .pipe(retry(1), catchError(this.handleError));
  }

  appointmenListByUserId(appointment: any): Observable<any> {
    return this.http.get<any>(this.appointmenListByUserIdurl + appointment, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  upcomingAppointmenByUserId(appointment: any): Observable<any> {
    return this.http.get<any>(this.appointmenUpcomingByUserIdurl + appointment, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  closedAppointmenByUserId(appointment: any): Observable<any> {
    return this.http.get<any>(this.appointmenClosedByUserIdurl + appointment, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // appointmenListByUserId(appointment: any): Observable<any> {
  //   return this.http.get<any>(this.appointmenListByUserIdurl + 'userId=' + appointment, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  confirmAppointment(model: any, flag): Observable<any> {
    return this.http.post(this.conffirm + flag, JSON.stringify(model), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  vitalListByPatientId(patientId: any): Observable<any> {
    return this.http.get<any>(this.vitallist + patientId, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  appointmenListByUserIdList(user_id: any, currentPage: any, size: any, sort: any, col: any, fromDate: any, toDate: any): Observable<any> {
    return this.http.get<any>(this.List_appointmenListByUserIdurl + 'userId=' + user_id + '&page=' + currentPage + '&size=' + size + '&sort=' + sort + '&col=' + col + '&fromDate=' + fromDate + '&toDate=' + toDate, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  closedAppointmenListByUserId(user_id: any, currentPage: any, size: any, sort: any, col: any): Observable<any> {
    return this.http.get<any>(this.closedAppointmenListByUserIdurl + 'userId=' + user_id + '&page=' + currentPage + '&size=' + size + '&sort=' + sort + '&col=' + col, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getDropDown(currentPage: any, size: any, globalFilter: any): Promise<any> {
    return this.http.get(this.GetDropDown + 'page=' + currentPage + '&size=' + size + '&globalFilter=' + globalFilter)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addFileUplaodService(model: any) {
    return this.http.post(this.uploadFileUrl, model, {responseType: 'text'})
      .toPromise()
      .then(response => response.toString())
      .catch(this.handleError);
  }

  // addFileUplaodService(model: any) {
  //   return this.http.post(this.uploadFileUrl, model )
  //     .toPromise()
  //     .then(response => response as any)
  //     .catch(this.handleError);
  // }

  patientIdByUserId(user_id: any): Promise<any> {
    return this.http.put(this.getPatientId + user_id, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  addRecordService(model: any): Promise<any> {
    return this.http.post(this.AddRecord, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addRecordForRefferals(model: any): Promise<any> {
    return this.http.post(this.AddRecordForRefferals, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addRecordForRadiology(model: any): Promise<any> {
    return this.http.post(this.AddRecordForRadiology, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addRecordForLabReports(model: any): Promise<any> {
    return this.http.post(this.AddRecordForLabReports, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addRecordForPrescription(model: any): Promise<any> {
    return this.http.post(this.AddREcordForPrescription, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }



  addRecordForMedicalTourism(model: any): Promise<any> {
    return this.http.post(this.AddRecordForMT, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  addRecordForMedicineDelivery(model: any): Promise<any> {
    return this.http.post(this.AddRecordForMD, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addRecordForSickLeaves(model: any): Promise<any> {
    return this.http.post(this.AddRecordForSickLeaves, JSON.stringify(model), this.httpOptions)
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

  getDocBySubDeptIdService(id: any): Observable<any> {
    return this.http.get(this.getDocsBySubDepId + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getStaffRecordService(id: any): Observable<any> {
    return this.http.get(this.getStaffRecord + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getTodaySlotRecordService(id: any, dur: any, day: any, currAppDate: any): Promise<any> {
    let model: any = {};
    model.staffId = id;
    model.dur = (dur!=null && dur!=undefined)?dur:15;
    model.dayOfWeek = day;
    model.currAppDate = currAppDate;
    return this.http.post(this.todaySlot, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  // handleError(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     errorMessage = error.error.message;
  //   } else {
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   return throwError(errorMessage);
  // }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}
