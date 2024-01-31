import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Global} from "../globalpath";

@Injectable()
export class MyConsultationviewService {
  private GetRecord = this.globals.globallink + 'temr_timeline/byid/';
  private GetHistoryByPatientId = this.globals.globallink + 'temr_visit_history/by_patient_id/';
  private GetChiefComplaintBytimelineId = this.globals.globallink + 'temr_visit_chief_complaint/listbytimelineid/';
  private GetSymtomsByTimelineId = this.globals.globallink + 'temr_visit_symptom/listbytimelineid/';
  private GetNonDrgAlgByTmeineId = this.globals.globallink + 'temr_visit_non_drug_allergy/listbytimelineid/';
  private GetAllergyByTimelineId = this.globals.globallink + 'temr_visit_allergy/listbytimelineid/?';
  private GetVitalsByTimelineId = this.globals.globallink + 'temr_vital/listbytimelineid/?';
  private GetDiagnosisByTimelineId = this.globals.globallink + 'temr_visit_diagnosis/getAllRecordServicebyTimelineId?';
  private GetClinicalRecordByTimelineId = this.globals.globallink + 'temr_doctors_advice/listByTimelineId/?';
  private GetInvestigationByTimelineId = this.globals.globallink + 'temr_visit_investigation/listbytimelienid?';
  private GetPrescriptionByTimelineId = this.globals.globallink + 'temr_visit_prescription/bytimelineid/';
  private GetReferalLatterrdbyVisitId = this.globals.globallink + 'temr_referral_history/getReferalListByVisitId/?';
  private GetUnitById = this.globals.globallink + 'mst_unit/byid/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  getUnitById(id: any): Observable<any> {
    return this.http.post<any>(this.GetUnitById + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getTimelineRecordService(id: any): Observable<any> {
    return this.http.post<any>(this.GetRecord + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getHistoryByPatientId(id: any): Observable<any> {
    return this.http.post<any>(this.GetHistoryByPatientId + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getChiefComplaintBytimelineId(id: any): Observable<any> {
    return this.http.post<any>(this.GetChiefComplaintBytimelineId + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getSymtomsByTimelineId(id: any): Observable<any> {
    return this.http.post<any>(this.GetSymtomsByTimelineId + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getNonDrgAlgByTmeineId(id: any): Observable<any> {
    return this.http.get<any>(this.GetNonDrgAlgByTmeineId + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getAllergyByTimelineId(currentPage: any, size: any, patientId: any, sort: any, col: any): Observable<any> {
    return this.http.post<any>(this.GetAllergyByTimelineId + 'page=' + currentPage + '&size=' + size + '&timelineId=' + patientId + '&sort=' + sort + '&col=' + col, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getVitalsByTimelineId(currentPage: any, size: any, qString: any, sort: any, col: any): Observable<any> {
    return this.http.post<any>(this.GetVitalsByTimelineId + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getDiagnosisByTimelineId(currentPage: any, size: any, qString: any, sort: any, col: any): Observable<any> {
    return this.http.post<any>(this.GetDiagnosisByTimelineId + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getClinicalRecordByTimelineId(currentPage: any, size: any, qString: any, sort: any, col: any): Observable<any> {
    return this.http.post<any>(this.GetClinicalRecordByTimelineId + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getInvestigationByTimelineId(currentPage: any, size: any, qString: any, sort: any, col: any): Observable<any> {
    return this.http.post<any>(this.GetInvestigationByTimelineId + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getPrescriptionByTimelineId(id: any): Observable<any> {
    return this.http.get<any>(this.GetPrescriptionByTimelineId + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getReferalLatterrdbyVisitId(id: any): Observable<any> {
    return this.http.get<any>(this.GetReferalLatterrdbyVisitId + 'visitId=' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}
