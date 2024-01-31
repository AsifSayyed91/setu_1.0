import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Global} from "../globalpath";


@Injectable()
export class NewBookAppointmentService {
  private findDoctorSymtoms = this.globals.globallink + 'trn_doctor_schedule_detail/getDoctorListBySymtomsId/';
  private findDoctorSpeciality = this.globals.globallink + 'trn_doctor_schedule_detail/getDoctorListBySpecialityId/';
  private GetdoctorListByUnitId = this.globals.globallink + 'mst_unit/GetDoctorByUnitId/';
  private UnitListByInsuranceId = this.globals.globallink + 'mst_unit/GetUnitByInsuranceId/';
  // private serviceList = this.globals.globallink + 'mbill_service/listOfService';
  // private todaySlot = this.globals.globallink + 'trn_doctor_schedule_detail/time/';
  // private appointment = this.globals.globallink + 'trn_appointment/createAppointment/';
  // private conffirm = this.globals.globallink + 'trn_appointment/confirmAppointment/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  // getServiceList(): Observable<any[]> {
  //   return this.http.get<any[]>(this.serviceList)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  getUnitListByInsuranceId(id: any): Observable<any> {
    return this.http.get(this.UnitListByInsuranceId + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getDoctorListBySymtoms(appointmentDate: any, symtomId: any, userId: any, cityId: any, model: any): Observable<any> {
    return this.http.put<any>(this.findDoctorSymtoms + appointmentDate + '/' + symtomId + '/' + userId + '/1/1000' + '/' + cityId, JSON.stringify(model), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getDoctorListBySpeciality(appointmentDate: any, specialityId: any, userId: any, cityId: any, model: any): Observable<any> {
    return this.http.put<any>(this.findDoctorSpeciality + appointmentDate + '/' + specialityId + '/' + userId + '/1/1000' + '/' + cityId, JSON.stringify(model), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

 /* getDoctorListBySpeciality(appointmentDate: any, specialityId: any, userId: any, page:any, size:any, cityId: any, model: any): Observable<any> {
    return this.http.put<any>(this.findDoctorSpeciality + appointmentDate + '/' + specialityId + '/' + userId + '/1/1000' + '/' + cityId, JSON.stringify(model), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
*/
  getDoctorListByUnitId(id: any): Observable<any> {
    return this.http.get(this.GetdoctorListByUnitId + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /* getDoctorListByUnitId(unitId: any): Observable<any> {
     return this.http.put<any>(this.GetdoctorListByUnitId  + unitId ,  this.httpOptions)
       .pipe(retry(1), catchError(this.handleError));
   }*/

  // getTodaySlotRecordService(id: any, dur: any, day: any, currAppDate: any): Promise<any> {
  //   let model: any = {};
  //   model.staffId = id;
  //   model.dur = dur;
  //   model.dayOfWeek = day;
  //   model.currAppDate = currAppDate;
  //   return this.http.post(this.todaySlot, JSON.stringify(model), this.httpOptions)
  //     .toPromise()
  //     .then(response => response)
  //     .catch(this.handleError);
  // }

  // createAppointment(appointment): Observable<any> {
  //   return this.http.post<any>(this.appointment, JSON.stringify(appointment), this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  //
  // confirmAppointment(model: any, flag): Observable<any> {
  //   return this.http.post(this.conffirm + flag, JSON.stringify(model), this.httpOptions)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
