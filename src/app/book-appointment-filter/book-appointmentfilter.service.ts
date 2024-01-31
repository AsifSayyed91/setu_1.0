import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Global} from "../globalpath";


@Injectable()
export class AppointmentServiceFilter {
  private findDoctor = this.globals.globallink + 'trn_doctor_schedule_detail/getDoctorList/';
  private findDoctors = this.globals.globallink + 'trn_doctor_schedule_detail/getDoctorList/';
  private serviceList = this.globals.globallink + 'mbill_service/listOfService';
  private subdeptlist = this.globals.globallink + 'mst_sub_department/dropdown1';
  private languageList = this.globals.globallink + 'mst_language/getLanguages';
  private todaySlot = this.globals.globallink + 'trn_doctor_schedule_detail/time/';
  private appointment = this.globals.globallink + 'trn_appointment/createAppointment/';
  private conffirm = this.globals.globallink + 'trn_appointment/confirmAppointment/';
  private sendappoinmentconfirmmail = this.globals.globallink + 'trn_appointment/confirmAppoitmentMAil/';
  private billCreate = this.globals.globallink + 'tbill_bill/create';
  private billServiceCreate = this.globals.globallink + 'tbill_service/createBilleServiceFromAppointment/';
  private followCreate = this.globals.globallink + 'trn_followup/create/';
  private doctorFilterList = this.globals.globallink + 'trn_doctor_schedule_detail/getDoctorListByFilter/';
  private subdeptlists = this.globals.globallink + 'mst_speciality/getAllSpecality';
  private symptomsList = this.globals.globallink + 'memr_symptom/listByshowInSymtoms';
  private cityList = this.globals.globallink + 'mst_city/doctorCityList';
  private searchspec = this.globals.globallink + 'mst_speciality/autocompleteSpec/';
  private insuranceList = this.globals.globallink + 'mst_insurance/list';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  getInsuranceList(): Observable<any[]> {
    return this.http.get<any>(this.insuranceList)
      .pipe(retry(1), catchError(this.handleError));
  }


  getServiceList(): Observable<any[]> {
    return this.http.get<any[]>(this.serviceList)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCityList(): Observable<any[]> {
    return this.http.get<any[]>(this.cityList)
      .pipe(retry(1), catchError(this.handleError));
  }

  getSpecalityList(): Observable<any[]> {
    return this.http.get<any[]>(this.subdeptlists)
      .pipe(retry(1), catchError(this.handleError));
  }

  getSymptomsList(): Observable<any[]> {
    return this.http.get<any[]>(this.symptomsList)
      .pipe(retry(1), catchError(this.handleError));
  }

  getsearchBySpeci(key): Observable<any[]> {
    return this.http.get<any[]>(this.searchspec + key)
      .pipe(retry(1), catchError(this.handleError));
  }

  // getDoctorList(appointmentDate: any,serviceId: any,userId:any,model:any): Observable<any> {
  //   return this.http.get<any>(this.findDoctor + appointmentDate + '/' + serviceId + '/' + userId , JSON.stringify(model), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  getDoctorList(appointmentDate: any, serviceId: any, userId: any, page:any, size:any, cityId: any, model: any): Observable<any> {
    return this.http.put<any>(this.findDoctor + appointmentDate + '/' + serviceId + '/' + userId + '/1/1000' + '/' + cityId, JSON.stringify(model), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /*getDoctorlist():Observable<any[]>{
    return this.http.get<any[]>(this.findDoctors)
      .pipe(retry(1),catchError(this.handleError));
  }*/

  getDoctorLists(appointmentDate: any, serviceId: any, userId: any, page: any, size: any, cityId: any, model: any): Observable<any> {
    return this.http.put<any>(this.findDoctors + appointmentDate + '/' + serviceId + '/' + userId + '/' + page + '/' + size + '/' + cityId, JSON.stringify(model), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

 /* getLanguaeList(): Observable<any[]> {
    return this.http.get<any[]>(this.LanguageList)
      .pipe(retry(1), catchError(this.handleError));
  }*/

  getLanguageList(): Observable<any[]> {
    return this.http.get<any[]>(this.languageList)
  }

  getSubDeptList(): Observable<any[]> {
    return this.http.get<any[]>(this.subdeptlist)
      .pipe(retry(1), catchError(this.handleError));
  }

  getTodaySlotRecordService(id: any, dur: any, day: any, currAppDate: any): Promise<any> {
    let model: any = {};
    model.staffId = id;
    model.dur = dur;
    model.dayOfWeek = day;
    model.currAppDate = currAppDate;
    return this.http.post(this.todaySlot, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  createAppointment(appointment): Observable<any> {
    return this.http.post<any>(this.appointment, JSON.stringify(appointment), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  confirmAppointment(model: any, flag): Observable<any> {
    return this.http.post(this.conffirm + flag, JSON.stringify(model), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  confirmAppointmentSendMail(appoinmentId: any): Observable<any> {
    return this.http.get<any>(this.sendappoinmentconfirmmail + appoinmentId)
      .pipe(retry(1), catchError(this.handleError));
  }

  createBill(model: any): Observable<any> {
    return this.http.post(this.billCreate, JSON.stringify(model), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  createBillService(model: any, id, visit_id): Observable<any> {
    return this.http.post(this.billServiceCreate + id + '/' + visit_id, JSON.stringify(model), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  followCreateService(userId, staffId, model): Promise<any> {
    return this.http.post(this.followCreate + userId + '/' + staffId, JSON.stringify(model), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getDoctorFilter(date: any, serviceId: any, userId: any, sId:any, cityId: any, genderId: any,  unitId: any, languageId: any, symptomId: any, insuranceId: any): Observable<any[]> {
    return this.http.get<any[]>(this.doctorFilterList + date + '/' + serviceId + '/' + userId + '/' + sId + '/' + cityId + '/' + genderId + '/'  + unitId + '/' + languageId + '/' + symptomId + '/' + insuranceId + '/1000/1')
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
