import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';
import {catchError, retry} from "rxjs/operators";
import {Observable} from "../../../node_modules/rxjs";

@Injectable()
export class MedicalTourismService {

  private documentlist = this.globals.globallink + 'mst_document_category/dropdown/?';
  private getMedicalTourismsList = this.globals.globallink + 'medicalTourims/list/';
  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private getMedicalTourismslistByid = this.globals.globallink + 'medicalTourims/medicalTourismListById/';
  private addMedicalToursim = this.globals.globallink + 'medicalTourims/create/';
  private getCountriesList = this.globals.globallink + 'countryMaster/list';
  private getHospitalsList = this.globals.globallink + 'hospital/list';
  private getHospitalsListByCountryId = this.globals.globallink + 'hospital/hospitalByCountryId/';
  private getDepartmentsListByHospitalId = this.globals.globallink + 'department/departmentByHospitalId/';
  private departmentsList = this.globals.globallink + 'department/list';
  private uploadDocument = this.globals.globallink + 'uploadFile/api/uploadpatientdoc/';





  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  getMedicalTourismList(): Promise<any> {
    return this.http.get(this.getMedicalTourismsList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getMedicalTourismListById(medicalTourismId: any): Promise<any> {
    return this.http.get(this.getMedicalTourismslistByid + medicalTourismId, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addMedicalTourims(model: any): Promise<any> {
    return this.http.post(this.addMedicalToursim, model, this.httpOptions)
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

  getCountryList(): Observable<any[]> {
    return this.http.get<any[]>(this.getCountriesList)
      .pipe(retry(1), catchError(this.handleError));
  }

  getHospitalList(): Observable<any[]> {
    return this.http.get<any[]>(this.getHospitalsList)
      .pipe(retry(1), catchError(this.handleError));
  }


  getDepartmentList(): Observable<any[]> {
    return this.http.get<any[]>(this.departmentsList)
      .pipe(retry(1), catchError(this.handleError));
  }


  getHospitalListByCountryId(countryId: number): Observable<any[]> {
    return this.http.get<any[]>(this.getHospitalsListByCountryId + countryId)
      .pipe(retry(1), catchError(this.handleError));
  }


  getDepartmentListByHospitalId(hospitalId: number): Observable<any[]> {
    return this.http.get<any[]>(this.getDepartmentsListByHospitalId + hospitalId)
      .pipe(retry(1), catchError(this.handleError));
  }


  uploadDoc(model: any) {
    return this.http.post(this.uploadDocument, model )
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
